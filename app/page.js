'use client';

import { useMemo, useState } from 'react';

const junkFoods = [
  'burger',
  'cheeseburger',
  'pizza',
  'fries',
  'french fries',
  'chips',
  'candy',
  'chocolate bar',
  'donut',
  'doughnut',
  'cookies',
  'cookie',
  'cake',
  'cupcake',
  'ice cream',
  'soda',
  'cola',
  'hot dog',
  'nachos',
  'milkshake',
  'nuggets',
  'chicken nuggets',
];

const healthyFoods = [
  'apple',
  'banana',
  'orange',
  'grapes',
  'strawberries',
  'carrot',
  'broccoli',
  'spinach',
  'salad',
  'oatmeal',
  'eggs',
  'chicken',
  'fish',
  'rice',
  'beans',
  'lentils',
  'yogurt',
  'nuts',
  'avocado',
  'water',
];

const junkClues = ['fried', 'sugary', 'cream-filled', 'processed', 'fast food'];
const healthyClues = ['fresh', 'grilled', 'baked', 'steamed', 'whole grain'];

function cleanFoodName(food) {
  return food.trim().toLowerCase().replace(/[?!.,]/g, '');
}

function checkFood(food) {
  const cleanedFood = cleanFoodName(food);

  if (!cleanedFood) {
    return {
      type: 'empty',
      title: 'Type a food to get started',
      message: 'Try simple foods like “apple”, “pizza”, “broccoli”, or “fries”.',
      emoji: '🍽️',
    };
  }

  if (junkFoods.some((item) => cleanedFood.includes(item))) {
    return {
      type: 'junk',
      title: 'Junk food',
      message: 'This is usually high in added sugar, salt, unhealthy fat, or calories. Enjoy it as an occasional treat.',
      emoji: '🍟',
    };
  }

  if (junkClues.some((clue) => cleanedFood.includes(clue))) {
    return {
      type: 'junk',
      title: 'Probably junk food',
      message: 'The words you used often point to foods that are less nutritious. Check the ingredients if you are unsure.',
      emoji: '🍩',
    };
  }

  if (healthyClues.some((clue) => cleanedFood.includes(clue))) {
    return {
      type: 'healthy',
      title: 'Probably not junk food',
      message: 'The words you used often describe lighter cooking methods or wholesome foods.',
      emoji: '🥗',
    };
  }

  if (healthyFoods.some((item) => cleanedFood.includes(item))) {
    return {
      type: 'healthy',
      title: 'Not junk food',
      message: 'Nice choice! This food is commonly part of a balanced meal or snack.',
      emoji: '🥦',
    };
  }

  return {
    type: 'unknown',
    title: 'Not sure yet',
    message: 'Foods can be tricky! Look for clues: lots of sugar, deep frying, and heavy processing usually make a food more “junk”.',
    emoji: '🤔',
  };
}

export default function Home() {
  const [food, setFood] = useState('');
  const result = useMemo(() => checkFood(food), [food]);

  const examples = ['Apple', 'Pizza', 'Carrot', 'Soda', 'Grilled chicken', 'Ice cream'];

  const resultStyles = {
    empty: 'border-slate-200 bg-white text-slate-700',
    junk: 'border-rose-200 bg-rose-50 text-rose-900',
    healthy: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    unknown: 'border-amber-200 bg-amber-50 text-amber-900',
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white/85 shadow-2xl shadow-emerald-900/10 ring-1 ring-white/80 backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-gradient-to-br from-emerald-600 to-lime-500 p-8 text-white sm:p-10">
            <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide">
              Beginner friendly food checker
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Junk or No</h1>
            <p className="mt-5 text-lg leading-8 text-emerald-50">
              Type a food item and get a simple answer about whether it is usually considered junk food.
            </p>
            <div className="mt-8 rounded-2xl bg-white/15 p-5 text-sm leading-6 ring-1 ring-white/25">
              <p className="font-bold">Quick tip</p>
              <p className="mt-1 text-emerald-50">
                This app is for learning. Real nutrition depends on ingredients, serving size, and how often you eat it.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <label htmlFor="food" className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Food item
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="food"
                value={food}
                onChange={(event) => setFood(event.target.value)}
                placeholder="Try: pizza, apple, fries..."
                className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-lg outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
              <button
                type="button"
                onClick={() => setFood('')}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
              >
                Clear
              </button>
            </div>

            <article className={`mt-6 rounded-3xl border p-6 transition ${resultStyles[result.type]}`}>
              <div className="flex items-start gap-4">
                <span className="text-5xl" aria-hidden="true">
                  {result.emoji}
                </span>
                <div>
                  <h2 className="text-2xl font-black">{result.title}</h2>
                  <p className="mt-2 leading-7">{result.message}</p>
                </div>
              </div>
            </article>

            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Try an example</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setFood(example)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">1. Type</p>
                <p>Enter any food name.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">2. Check</p>
                <p>The answer updates instantly.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">3. Learn</p>
                <p>Use clues to make better choices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
