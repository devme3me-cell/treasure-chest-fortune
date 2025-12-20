#!/bin/bash

# Supabase Storage Quick Setup Helper
# This script helps you verify your setup step by step

echo "🖼️  SUPABASE STORAGE SETUP HELPER"
echo "=================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
    
    # Check if variables are set
    if grep -q "NEXT_PUBLIC_SUPABASE_URL=your_supabase" .env.local; then
        echo "⚠️  NEXT_PUBLIC_SUPABASE_URL not configured yet"
        echo "   → Go to Supabase Settings → API to get your URL"
    else
        echo "✅ NEXT_PUBLIC_SUPABASE_URL configured"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase" .env.local; then
        echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY not configured yet"
        echo "   → Go to Supabase Settings → API to get your anon key"
    else
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configured"
    fi
else
    echo "⚠️  .env.local file not found"
    echo "   → Copy .env.local.example to .env.local"
    echo "   → Run: cp .env.local.example .env.local"
fi

echo ""
echo "📋 SETUP CHECKLIST:"
echo "-------------------"
echo "□ Create Supabase project at https://supabase.com"
echo "□ Run SQL from .same/supabase-schema.sql"
echo "□ Copy API URL and anon key"
echo "□ Update .env.local with credentials"
echo "□ Restart dev server (bun run dev)"
echo "□ Test upload by playing the game"
echo ""
echo "📖 Full Guide: .same/SUPABASE_STORAGE_GUIDE.md"
echo ""
