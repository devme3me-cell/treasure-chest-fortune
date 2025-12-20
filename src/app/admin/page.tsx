'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Entry {
  id: string;
  created_at: string;
  email: string;
  username: string;
  deposit_amount: number;
  prize: string;
  image_url: string | null;
}

interface PrizeStats {
  prize: string;
  count: number;
  percentage: number;
  avg_deposit: number;
  min_deposit: number;
  max_deposit: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stats, setStats] = useState<PrizeStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simple password protection (change this to your desired password)
  const ADMIN_PASSWORD = 'admin123'; // TODO: Change this!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('密碼錯誤');
    }
  };

  const fetchData = async () => {
    if (!isSupabaseConfigured()) {
      setError('Supabase 未配置。請將憑證添加到 .env.local');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors

    console.log('🔍 Admin: Fetching data from Supabase...');

    try {
      // Fetch all entries
      console.log('📊 Fetching entries...');
      const { data: entriesData, error: entriesError } = await supabase
        .from('treasure_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (entriesError) {
        console.error('❌ Error fetching entries:', entriesError);
        throw new Error(`數據庫錯誤：${entriesError.message}。請檢查 RLS 政策！`);
      }

      console.log(`✅ Found ${entriesData?.length || 0} entries`);
      setEntries(entriesData || []);

      // Fetch statistics
      console.log('📊 Fetching statistics...');
      const { data: statsData, error: statsError } = await supabase
        .from('prize_statistics')
        .select('*');

      if (statsError) {
        console.warn('⚠️ Stats view not available:', statsError);
      } else {
        console.log(`✅ Found ${statsData?.length || 0} prize types`);
        setStats(statsData || []);
      }
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      setError(err instanceof Error ? err.message : '獲取數據失敗');
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.email.toLowerCase().includes(filter.toLowerCase()) ||
    entry.username.toLowerCase().includes(filter.toLowerCase()) ||
    entry.prize.toLowerCase().includes(filter.toLowerCase())
  );

  const totalEntries = entries.length;
  const totalDeposit = entries.reduce((sum, entry) => sum + Number(entry.deposit_amount), 0);
  const avgDeposit = totalEntries > 0 ? totalDeposit / totalEntries : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full prize-card p-8 rounded-xl">
          <h1 className="text-3xl font-display font-bold text-gold-gradient mb-6 text-center">
            管理後台
          </h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-foreground/80 mb-2 block">
                輸入管理員密碼
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="密碼"
                className="bg-background/50 border-gold/30 focus:border-gold"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button
              onClick={handleLogin}
              className="w-full bg-gold hover:bg-gold/90 text-background font-display"
            >
              登入
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gold-gradient">
            管理後台
          </h1>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-gold/30 hover:border-gold"
          >
            登出
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="prize-card p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-1">總記錄數</p>
            <p className="text-3xl font-display text-gold">{totalEntries}</p>
          </div>
          <div className="prize-card p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-1">總存款金額</p>
            <p className="text-3xl font-display text-gold">
              ${totalDeposit.toLocaleString()}
            </p>
          </div>
          <div className="prize-card p-6 rounded-xl">
            <p className="text-foreground/60 text-sm mb-1">平均存款</p>
            <p className="text-3xl font-display text-gold">
              ${avgDeposit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Prize Distribution */}
        {stats.length > 0 && (
          <div className="prize-card p-6 rounded-xl mb-6">
            <h2 className="text-xl font-display text-gold mb-4">獎品分佈</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat) => (
                <div key={stat.prize} className="text-center">
                  <p className="text-foreground/80 font-display mb-1">{stat.prize}</p>
                  <p className="text-2xl text-gold">{stat.count}</p>
                  <p className="text-xs text-foreground/60">{stat.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="按電子郵件、用戶名或獎品篩選..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 bg-background/50 border-gold/30 focus:border-gold"
          />
          <Button
            onClick={fetchData}
            disabled={loading}
            className="bg-gold hover:bg-gold/90 text-background font-display"
          >
            {loading ? '載入中...' : '刷新'}
          </Button>
        </div>

        {error && (
          <div className="prize-card p-4 rounded-xl mb-6 bg-red-500/10 border border-red-500/30">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>

      {/* Entries Table */}
      <div className="max-w-7xl mx-auto">
        <div className="prize-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background/50 border-b border-gold/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">日期</th>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">電子郵件</th>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">用戶名</th>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">金額</th>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">獎品</th>
                  <th className="px-4 py-3 text-left text-sm font-display text-gold">圖片</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      {loading ? (
                        <p className="text-foreground/60">載入記錄中...</p>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-foreground/60 text-lg">沒有找到記錄</p>
                          <div className="text-sm text-foreground/40 max-w-md mx-auto">
                            <p className="mb-2">可能原因：</p>
                            <ul className="text-left space-y-1">
                              <li>• 還沒有人玩過遊戲</li>
                              <li>• RLS 政策阻止讀取</li>
                              <li>• 數據庫表未創建</li>
                            </ul>
                            <p className="mt-3 text-gold/60">
                              💡 打開瀏覽器控制台 (F12) 並點擊刷新查看日誌
                            </p>
                            <p className="mt-2 text-gold/60">
                              📖 查看 .same/DEBUG_GUIDE.md 獲取幫助
                            </p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-foreground/10 hover:bg-background/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {new Date(entry.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {entry.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {entry.username}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        ${Number(entry.deposit_amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 rounded text-xs font-display bg-gold/20 text-gold">
                          {entry.prize}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {entry.image_url ? (
                          <button
                            onClick={() => setSelectedImage(entry.image_url)}
                            className="text-gold hover:text-gold/80 text-sm underline"
                          >
                            查看圖片
                          </button>
                        ) : (
                          <span className="text-foreground/40 text-sm">無圖片</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center text-foreground/60 text-sm">
          顯示 {totalEntries} 條記錄中的 {filteredEntries.length} 條
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <div className="prize-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display text-gold">上傳的圖片</h3>
                <Button
                  onClick={() => setSelectedImage(null)}
                  variant="outline"
                  className="border-gold/30"
                >
                  關閉
                </Button>
              </div>
              <img
                src={selectedImage}
                alt="存款證明"
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => window.open(selectedImage, '_blank')}
                  className="bg-gold hover:bg-gold/90 text-background"
                >
                  在新標籤頁打開
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImage);
                    alert('網址已複製到剪貼板！');
                  }}
                  variant="outline"
                  className="border-gold/30"
                >
                  複製網址
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
