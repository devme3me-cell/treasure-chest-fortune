#!/usr/bin/env node

// Prize Distribution Test Script
// Run with: node test-distribution.js [number_of_tests]

const PRIZE_WEIGHTS = {
  '首儲金5%': 400,   // Base (most frequent)
  '首儲金7%': 20,    // 1/20 chance relative to 5%
  '首儲金10%': 1,    // 1/20 chance relative to 7%
  '首儲金30%': 0,    // Never awarded
  '首儲金50%': 0,    // Never awarded
  '首儲金100%': 0    // Never awarded
};

const PRIZES = Object.keys(PRIZE_WEIGHTS);

// Calculate expected percentages
const totalWeight = Object.values(PRIZE_WEIGHTS).reduce((a, b) => a + b, 0);
const expectedPercentages = {};
PRIZES.forEach(prize => {
  expectedPercentages[prize] = (PRIZE_WEIGHTS[prize] / totalWeight) * 100;
});

// Weighted random selection (same as app)
function selectWeightedPrize() {
  const weightedPrizes = [];

  Object.entries(PRIZE_WEIGHTS).forEach(([prize, weight]) => {
    for (let i = 0; i < weight; i++) {
      weightedPrizes.push(prize);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedPrizes.length);
  return weightedPrizes[randomIndex];
}

// Run the test
function runTest(iterations) {
  console.log('\n🎰 PRIZE DISTRIBUTION TEST');
  console.log('='.repeat(80));
  console.log(`Testing ${iterations.toLocaleString()} draws...\n`);

  const counts = {};
  PRIZES.forEach(prize => counts[prize] = 0);

  // Perform draws
  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    const prize = selectWeightedPrize();
    counts[prize]++;
  }
  const endTime = Date.now();

  // Display results
  console.log('RESULTS:');
  console.log('-'.repeat(80));

  PRIZES.forEach(prize => {
    const count = counts[prize];
    const actualPercentage = (count / iterations) * 100;
    const expectedPercentage = expectedPercentages[prize];
    const difference = actualPercentage - expectedPercentage;

    // Status indicator
    let status = '✅';
    if (PRIZE_WEIGHTS[prize] === 0 && count > 0) {
      status = '❌'; // Should never be awarded
    } else if (Math.abs(difference) > 1.0) {
      status = '⚠️';  // Outside expected range
    }

    console.log(`\n${status} ${prize}`);
    console.log(`   Count:     ${count.toLocaleString()} / ${iterations.toLocaleString()}`);
    console.log(`   Expected:  ${expectedPercentage.toFixed(2)}%`);
    console.log(`   Actual:    ${actualPercentage.toFixed(2)}%`);
    console.log(`   Difference: ${difference > 0 ? '+' : ''}${difference.toFixed(3)}%`);

    if (PRIZE_WEIGHTS[prize] === 0) {
      console.log(`   Type:      DISPLAY ONLY (should NEVER be awarded)`);
    } else if (PRIZE_WEIGHTS[prize] === 1) {
      console.log(`   Type:      SUPER RARE (超稀有)`);
    } else if (PRIZE_WEIGHTS[prize] === 20) {
      console.log(`   Type:      RARE (稀有)`);
    } else {
      console.log(`   Type:      COMMON`);
    }
  });

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION SUMMARY:');
  console.log('-'.repeat(80));

  const displayOnlyPrizes = PRIZES.filter(p => PRIZE_WEIGHTS[p] === 0);
  const displayOnlyCounts = displayOnlyPrizes.reduce((sum, p) => sum + counts[p], 0);

  console.log(`Total draws:              ${iterations.toLocaleString()}`);
  console.log(`Time taken:               ${(endTime - startTime)}ms`);
  console.log(`Total weight pool:        ${totalWeight}`);
  console.log('');
  console.log(`首儲金5% awarded:          ${counts['首儲金5%'].toLocaleString()} times (${((counts['首儲金5%']/iterations)*100).toFixed(2)}%)`);
  console.log(`首儲金7% awarded:          ${counts['首儲金7%'].toLocaleString()} times (${((counts['首儲金7%']/iterations)*100).toFixed(2)}%)`);
  console.log(`首儲金10% awarded:         ${counts['首儲金10%'].toLocaleString()} times (${((counts['首儲金10%']/iterations)*100).toFixed(2)}%)`);
  console.log('');
  console.log(`Display-only prizes:      ${displayOnlyCounts} times ${displayOnlyCounts === 0 ? '✅ CORRECT!' : '❌ ERROR - Should be 0!'}`);

  // Overall validation
  console.log('\n' + '='.repeat(80));
  const allDisplayOnlyZero = displayOnlyCounts === 0;
  const distributionCorrect = Math.abs(((counts['首儲金5%']/iterations)*100) - 95.01) < 2.0;

  if (allDisplayOnlyZero && distributionCorrect) {
    console.log('✅ OVERALL STATUS: PASS - Distribution is correct!');
  } else {
    console.log('❌ OVERALL STATUS: FAIL - Check the results above');
  }
  console.log('='.repeat(80) + '\n');
}

// Get iterations from command line or use default
const iterations = parseInt(process.argv[2]) || 10000;

if (iterations < 1 || iterations > 1000000) {
  console.error('❌ Error: Please provide a number between 1 and 1,000,000');
  process.exit(1);
}

runTest(iterations);
