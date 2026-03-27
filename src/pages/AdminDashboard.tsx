import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, LogOut, Loader2, Users, TrendingUp, AlertTriangle, CheckCircle,
  Clock, DollarSign, BarChart3, Eye, ShieldAlert, ArrowRight, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

type Transaction = Tables<"transactions">;
type Profile = Tables<"profiles">;
type Review = Tables<"reviews">;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      // Check admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const admin = roles?.some((r: any) => r.role === "admin");
      if (!admin) {
        navigate("/dashboard");
        return;
      }
      setIsAdmin(true);

      // Fetch all data in parallel
      const [txRes, profileRes, reviewRes] = await Promise.all([
        supabase.from("transactions").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*"),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      ]);

      setTransactions(txRes.data || []);
      setProfiles(profileRes.data || []);
      setReviews(reviewRes.data || []);
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleResolveDispute = async (txId: string, resolution: "COMPLETED" | "ESCROW") => {
    await supabase.from("transactions").update({ status: resolution }).eq("id", txId);
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: resolution } : t))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  // Analytics
  const totalVolume = transactions.reduce((s, t) => s + Number(t.amount), 0);
  const completedTx = transactions.filter((t) => t.status === "COMPLETED");
  const escrowTx = transactions.filter((t) => t.status === "ESCROW");
  const disputedTx = transactions.filter((t) => t.status === "DISPUTED");
  const pendingTx = transactions.filter((t) => t.status === "PENDING");
  const sellers = profiles.filter((p) => p.role === "seller");
  const buyers = profiles.filter((p) => p.role === "buyer");
  const avgTrustScore = profiles.length
    ? Math.round(profiles.reduce((s, p) => s + p.trust_score, 0) / profiles.length)
    : 0;
  const highRiskTx = transactions.filter((t) => (t.risk_score ?? 0) > 50);

  const statusData = [
    { name: "Completed", value: completedTx.length, fill: "hsl(170, 70%, 45%)" },
    { name: "Escrow", value: escrowTx.length, fill: "hsl(230, 80%, 56%)" },
    { name: "Disputed", value: disputedTx.length, fill: "hsl(0, 72%, 51%)" },
    { name: "Pending", value: pendingTx.length, fill: "hsl(220, 9%, 46%)" },
  ];

  const pieConfig: ChartConfig = {
    Completed: { label: "Completed", color: "hsl(170, 70%, 45%)" },
    Escrow: { label: "Escrow", color: "hsl(230, 80%, 56%)" },
    Disputed: { label: "Disputed", color: "hsl(0, 72%, 51%)" },
    Pending: { label: "Pending", color: "hsl(220, 9%, 46%)" },
  };

  // Monthly volume chart (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const month = d.toLocaleString("default", { month: "short" });
    const volume = transactions
      .filter((t) => {
        const td = new Date(t.created_at);
        return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
      })
      .reduce((s, t) => s + Number(t.amount), 0);
    return { month, volume };
  });

  const barConfig: ChartConfig = {
    volume: { label: "Volume (₦)", color: "hsl(230, 80%, 56%)" },
  };

  const statCards = [
    { label: "Total Volume", value: `₦${totalVolume.toLocaleString()}`, icon: DollarSign, color: "gradient-primary text-primary-foreground" },
    { label: "Total Users", value: String(profiles.length), icon: Users, color: "bg-secondary/10 text-secondary" },
    { label: "Transactions", value: String(transactions.length), icon: BarChart3, color: "bg-primary/10 text-primary" },
    { label: "Disputes", value: String(disputedTx.length), icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
    { label: "Avg Trust Score", value: String(avgTrustScore), icon: TrendingUp, color: "bg-accent/10 text-accent" },
    { label: "High Risk Flags", value: String(highRiskTx.length), icon: ShieldAlert, color: "bg-destructive/10 text-destructive" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      COMPLETED: "bg-accent/10 text-accent border-accent/20",
      ESCROW: "bg-primary/10 text-primary border-primary/20",
      DISPUTED: "bg-destructive/10 text-destructive border-destructive/20",
      PENDING: "bg-muted text-muted-foreground border-border",
    };
    return map[status] || map.PENDING;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">TrustPay</span>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">Admin</Badge>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
                <Icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs opacity-80 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Analytics</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="disputes">Disputes ({disputedTx.length})</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Monitor</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* ANALYTICS TAB */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Monthly Transaction Volume</CardTitle></CardHeader>
                <CardContent>
                  <ChartContainer config={barConfig} className="h-[250px]">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="hsl(230, 80%, 56%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Transaction Status Distribution</CardTitle></CardHeader>
                <CardContent>
                  <ChartContainer config={pieConfig} className="h-[250px]">
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {statusData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Platform Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Sellers</span><span className="font-semibold text-foreground">{sellers.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Buyers</span><span className="font-semibold text-foreground">{buyers.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Reviews</span><span className="font-semibold text-foreground">{reviews.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Completed Rate</span><span className="font-semibold text-accent">{transactions.length ? Math.round((completedTx.length / transactions.length) * 100) : 0}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Dispute Rate</span><span className="font-semibold text-destructive">{transactions.length ? Math.round((disputedTx.length / transactions.length) * 100) : 0}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Escrow Held</span><span className="font-semibold text-primary">₦{escrowTx.reduce((s, t) => s + Number(t.amount), 0).toLocaleString()}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Recent Reviews</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {reviews.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= r.rating ? "text-yellow-500" : "text-muted"}>★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground flex-1 truncate">{r.comment || "No comment"}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet</p>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ALL TRANSACTIONS TAB */}
          <TabsContent value="transactions">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell>{tx.seller_name}</TableCell>
                        <TableCell>₦{Number(tx.amount).toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge(tx.status)}`}>
                            {tx.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs font-semibold ${(tx.risk_score ?? 0) > 50 ? "text-destructive" : "text-accent"}`}>
                            {tx.risk_score ?? "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                        </TableCell>
                        <TableCell>
                          <Link to={`/transaction/${tx.id}`}>
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    {transactions.length === 0 && (
                      <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No transactions</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DISPUTES TAB */}
          <TabsContent value="disputes">
            <div className="space-y-4">
              {disputedTx.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
                    <p className="text-muted-foreground">No active disputes 🎉</p>
                  </CardContent>
                </Card>
              ) : (
                disputedTx.map((tx) => (
                  <Card key={tx.id} className="border-destructive/20">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{tx.description}</p>
                          <p className="text-sm text-muted-foreground">Seller: {tx.seller_name} ({tx.seller_email})</p>
                          <p className="text-sm text-muted-foreground">Amount: ₦{Number(tx.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground mt-1">Risk Score: {tx.risk_score ?? "N/A"}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-accent border-accent/20" onClick={() => handleResolveDispute(tx.id, "COMPLETED")}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Release Funds
                          </Button>
                          <Button size="sm" variant="outline" className="text-primary border-primary/20" onClick={() => handleResolveDispute(tx.id, "ESCROW")}>
                            <RefreshCw className="w-4 h-4 mr-1" /> Return to Escrow
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* FRAUD MONITOR TAB */}
          <TabsContent value="fraud">
            <Card>
              <CardHeader><CardTitle className="text-base">High Risk Transactions (Score &gt; 50)</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {highRiskTx.map((tx) => (
                      <TableRow key={tx.id} className="bg-destructive/5">
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell>{tx.seller_name}</TableCell>
                        <TableCell>₦{Number(tx.amount).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{tx.risk_score}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge(tx.status)}`}>
                            {tx.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link to={`/transaction/${tx.id}`}>
                            <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    {highRiskTx.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No high-risk transactions detected</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader><CardTitle className="text-base">Trust Score Distribution</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {profiles.sort((a, b) => a.trust_score - b.trust_score).slice(0, 10).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-40 truncate">{p.business_name || p.full_name}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${p.trust_score < 30 ? "bg-destructive" : p.trust_score < 60 ? "bg-yellow-500" : "bg-accent"}`}
                        style={{ width: `${p.trust_score}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${p.trust_score < 30 ? "text-destructive" : p.trust_score < 60 ? "text-yellow-500" : "text-accent"}`}>
                      {p.trust_score}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.full_name || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={p.role === "seller" ? "secondary" : "outline"} className="capitalize">{p.role}</Badge>
                        </TableCell>
                        <TableCell>{p.business_name || "—"}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${p.trust_score < 30 ? "text-destructive" : p.trust_score < 60 ? "text-yellow-500" : "text-accent"}`}>
                            {p.trust_score}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
