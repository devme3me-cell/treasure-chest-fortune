'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TreasureChest from '@/components/TreasureChest';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const PRIZES = [
  '首儲金5%',
  '首儲金7%',
  '首儲金10%',
  '首儲金30%',
  '首儲金50%',
  '首儲金100%'
];

// Prize weights based on distribution rules
const PRIZE_WEIGHTS = {
  '首儲金5%': 400,   // Base (most frequent)
  '首儲金7%': 20,    // 1/20 chance relative to 5%
  '首儲金10%': 1,    // 1/20 chance relative to 7% (1/400 relative to 5%)
  '首儲金30%': 0,    // Never awarded (display only)
  '首儲金50%': 0,    // Never awarded (display only)
  '首儲金100%': 0    // Never awarded (display only)
};

// Weighted random selection function
function selectWeightedPrize(): string {
  const weightedPrizes: string[] = [];

  // Build array with weighted entries
  Object.entries(PRIZE_WEIGHTS).forEach(([prize, weight]) => {
    for (let i = 0; i < weight; i++) {
      weightedPrizes.push(prize);
    }
  });

  // Random selection
  const randomIndex = Math.floor(Math.random() * weightedPrizes.length);
  return weightedPrizes[randomIndex];
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [registered, setRegistered] = useState<string>('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [prize, setPrize] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStep1Submit = () => {
    if (registered === 'yes' && email && username) {
      setStep(2);
    }
    // If registered === 'no', the icons are shown below, no need to do anything here
  };

  const handlePlatformClick = (url: string) => {
    window.location.href = url;
  };

  const handleStep2Submit = () => {
    if (uploadedImage && depositAmount) {
      setStep(3);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToSupabase = async (prizeWon: string) => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log('⚠️ Supabase not configured. Entry:', {
        email,
        username,
        depositAmount,
        prize: prizeWon,
        timestamp: new Date().toISOString()
      });
      console.log('📝 To configure: See .same/SUPABASE_SETUP.md');
      return;
    }

    setIsSaving(true);
    console.log('💾 Saving to Supabase...');

    try {
      let imageUrl = null;

      // Upload image to Supabase Storage if exists
      if (uploadedImage) {
        console.log('📤 Uploading image to Supabase Storage...');

        // Convert base64 to blob
        const base64Data = uploadedImage.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${email.replace(/[^a-z0-9]/gi, '_')}_${timestamp}.png`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('treasure-images')
          .upload(filename, blob, {
            contentType: 'image/png',
            upsert: false
          });

        if (uploadError) {
          console.error('❌ Error uploading image:', uploadError);
        } else {
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('treasure-images')
            .getPublicUrl(filename);

          imageUrl = publicUrl;
          console.log('✅ Image uploaded successfully:', imageUrl);
        }
      }

      // Save entry to database
      console.log('📤 Saving entry to database...');
      const { data, error } = await supabase
        .from('treasure_entries')
        .insert([
          {
            email,
            username,
            deposit_amount: parseFloat(depositAmount),
            prize: prizeWon,
            image_url: imageUrl
          }
        ])
        .select();

      if (error) {
        console.error('❌ Error saving to database:', error);
        throw error;
      }

      console.log('✅ Entry saved successfully to Supabase:', data);
    } catch (error) {
      console.error('❌ Error saving to Supabase:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTreasureClick = () => {
    if (hasPlayed) return;

    setIsOpening(true);
    setTimeout(async () => {
      const selectedPrize = selectWeightedPrize();
      setPrize(selectedPrize);
      setHasPlayed(true);
      setIsOpening(false);

      // Save to Supabase
      await saveToSupabase(selectedPrize);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-4 relative z-10">
        <img
          src="https://ugc.same-assets.com/klpd3rRdEAN2C5B8vRBE6oLAdfsS4PLE.png"
          alt="樹王團隊"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
      </div>

      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-3">
          樹王團隊
        </h1>
        <p className="text-muted-foreground text-lg">
          開啟寶箱，贏取豐厚獎勵
        </p>
      </div>

      {/* Step Indicator */}
      <div className="relative z-10 mb-8 flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display transition-all ${
                step === s
                  ? 'bg-gold text-background'
                  : step > s
                  ? 'bg-gold/50 text-background'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 ${
                  step > s ? 'bg-gold/50' : 'bg-muted'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Registration Check */}
      {step === 1 && (
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="prize-card p-8 rounded-xl">
            <h2 className="text-2xl font-display text-gold mb-6 text-center">
              會員驗證
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-foreground/80 mb-4 block">
                  您是否已在我們的網站註冊成為會員？
                </Label>
                <RadioGroup value={registered} onValueChange={setRegistered}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">
                      是，我已註冊
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">
                      否，我需要註冊
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {registered === 'yes' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <Label htmlFor="email" className="text-foreground/80">
                      LINE ID
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="請輸入您的LINE ID"
                      className="mt-2 bg-background/50 border-gold/30 focus:border-gold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="username" className="text-foreground/80">
                      用戶名
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="請輸入您的用戶名"
                      className="mt-2 bg-background/50 border-gold/30 focus:border-gold"
                    />
                  </div>
                </div>
              )}

              {registered === 'no' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-4">
                    <p className="text-gold font-display text-lg mb-2">選擇註冊平台</p>
                    <p className="text-foreground/60 text-sm">雙擊下方平台即可進行註冊，每個平台註冊都可以個別進行一次首儲抽獎喔！</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Platform 1 */}
                    <button
                      onClick={() => handlePlatformClick('https://chitu5168.mw1688.tw/')}
                      className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-background/50 p-4 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <img
                        src="https://i.postimg.cc/fRN3Q5HL/1.png"
                        alt="平台 1"
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Platform 2 */}
                    <button
                      onClick={() => handlePlatformClick('https://chitu5168.3a1788.bet/')}
                      className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-background/50 p-4 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <img
                        src="https://i.postimg.cc/QdJF85Pd/2.png"
                        alt="平台 2"
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Platform 3 */}
                    <button
                      onClick={() => handlePlatformClick('https://bm9981.com/ag/chitu1688')}
                      className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-background/50 p-4 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
                    >
                      <img
                        src="https://i.postimg.cc/K8D1GLVx/3.png"
                        alt="平台 3"
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {registered === 'yes' && (
                <Button
                  onClick={handleStep1Submit}
                  disabled={!email || !username}
                  className="w-full bg-gold hover:bg-gold/90 text-background font-display text-lg h-12"
                >
                  下一步
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Upload & Amount */}
      {step === 2 && (
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="prize-card p-8 rounded-xl">
            <h2 className="text-2xl font-display text-gold mb-6 text-center">
              上傳存款證明
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="image" className="text-foreground/80">
                  上傳存款截圖
                </Label>
                <div className="mt-2">
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded proof"
                        className="w-full max-h-[600px] object-contain rounded-lg border border-gold/30"
                      />
                      <Button
                        onClick={() => setUploadedImage(null)}
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                      >
                        移除
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gold/30 rounded-lg cursor-pointer hover:border-gold/50 transition-colors"
                    >
                      <svg
                        className="w-12 h-12 text-gold/50 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="text-foreground/60">點擊上傳圖片</span>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="amount" className="text-foreground/80">
                  存款金額
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="請輸入存款金額"
                  className="mt-2 bg-background/50 border-gold/30 focus:border-gold"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-gold/30 hover:border-gold"
                >
                  上一步
                </Button>
                <Button
                  onClick={handleStep2Submit}
                  disabled={!uploadedImage || !depositAmount}
                  className="flex-1 bg-gold hover:bg-gold/90 text-background font-display text-lg"
                >
                  開始抽獎
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Treasure Game */}
      {step === 3 && (
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="relative">
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 -top-20 rounded-full blur-3xl transition-all duration-500 pointer-events-none ${
                isOpening
                  ? 'bg-gradient-to-t from-gold to-gold/30 scale-150 opacity-100'
                  : 'bg-gradient-to-t from-gold/30 to-gold/10 scale-100 opacity-50'
              }`}
            ></div>

            {/* Treasure Chest */}
            <div className="relative flex flex-col items-center">
              {!prize && !hasPlayed && (
                <>
                  <div className="sparkle top-4 left-8" style={{ animationDelay: '0s' }}></div>
                  <div className="sparkle top-12 right-6" style={{ animationDelay: '0.5s' }}></div>
                  <div className="sparkle bottom-20 left-12" style={{ animationDelay: '1s' }}></div>
                  <div className="sparkle bottom-12 right-16" style={{ animationDelay: '0.3s' }}></div>
                </>
              )}

              <TreasureChest
                isOpen={prize !== null}
                isShaking={isOpening}
                onClick={hasPlayed ? undefined : handleTreasureClick}
              />

              {!prize && !hasPlayed && (
                <p className="mt-4 text-center text-gold/80 font-display text-lg animate-pulse">
                  點擊寶箱抽獎
                </p>
              )}
            </div>

            {prize && (
              <div className="mt-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="prize-card p-6 rounded-xl">
                  <p className="text-foreground/60 mb-2">恭喜您獲得</p>
                  <p className="text-3xl font-display text-gold-gradient mb-4">
                    {prize}
                  </p>
                  <p className="text-sm text-foreground/50">
                    存款金額：${depositAmount}
                  </p>
                  <p className="text-sm text-foreground/50 mt-1">
                    您已完成抽獎，感謝參與！
                  </p>
                  {isSaving && (
                    <p className="text-xs text-gold/60 mt-3 animate-pulse">
                      正在保存記錄...
                    </p>
                  )}
                  {!isSaving && isSupabaseConfigured() && (
                    <p className="text-xs text-green-500/60 mt-3">
                      ✓ 記錄已保存
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Prize List */}
          <div className="w-full max-w-md mx-auto mt-12">
            <h3 className="text-center text-gold font-display text-xl mb-6">
              獎品列表
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PRIZES.map((p, i) => {
                const weight = PRIZE_WEIGHTS[p as keyof typeof PRIZE_WEIGHTS];
                const isDisplayOnly = weight === 0;
                const isRare = weight > 0 && weight <= 20;

                return (
                  <div
                    key={i}
                    className={`prize-card px-4 py-3 rounded-lg text-center transition-all duration-300 relative ${
                      prize === p ? 'border-gold bg-gold/20' : ''
                    } ${isDisplayOnly ? 'opacity-60' : ''}`}
                  >
                    <span className="font-display text-lg text-foreground/80">
                      {p}
                    </span>
                    {isDisplayOnly && (
                      <span className="block text-xs text-foreground/40 mt-1">
                        展示獎項
                      </span>
                    )}
                    {isRare && weight === 1 && (
                      <span className="block text-xs text-gold/60 mt-1">
                        超稀有
                      </span>
                    )}
                    {isRare && weight === 20 && (
                      <span className="block text-xs text-gold/60 mt-1">
                        稀有
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-16 mb-8 text-center">
        <p className="text-foreground/70 text-sm mb-2">
          若有任何疑問，請洽LINE客服ID：
          <a
            href="https://line.me/ti/p/~@106rgyyi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-medium hover:text-gold/80 underline decoration-gold/50 hover:decoration-gold transition-colors"
          >
            @106rgyyi
          </a>
        </p>
        <small className="text-foreground/50 text-xs">
          樹王團隊 ©2025 版權所有，盜用必究
        </small>
      </footer>

      {/* Decorative GIF - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FkeGp1OGQ2N2NpbzV6anBrc2U5d3A0NjZsaWExa2d3bGZ3NnNzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3SQNeOuhyFQBws6xEE/giphy.gif"
          alt="Decorative animation"
          className="w-24 h-24 md:w-32 md:h-32 opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
}
