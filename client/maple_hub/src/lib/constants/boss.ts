import type { Boss } from '$lib/types';

export const bosses: Boss[] = [
  {
    id: 'zakum',
    name: '자쿰',
    image: '/boss_images/zakum.webp',
    difficulties: [
      { name: '이지', price: 612500, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 1530000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 12750000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'magnus',
    name: '매그너스',
    image: '/boss_images/magnus.webp',
    difficulties: [
      { name: '이지', price: 5670000, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 9945000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 19890000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'hilla',
    name: '힐라',
    image: '/boss_images/hilla.webp',
    difficulties: [
      { name: '노말', price: 2601000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 13770000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'papulatus',
    name: '파풀라투스',
    image: '/boss_images/papulatus.webp',
    difficulties: [
      { name: '이지', price: 5508000, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 8874000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 17748000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'pierre',
    name: '피에르',
    image: '/boss_images/pierre.webp',
    difficulties: [
      { name: '노말', price: 7803000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 25500000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'vonbon',
    name: '반반',
    image: '/boss_images/vonbon.webp',
    difficulties: [
      { name: '노말', price: 7803000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 25500000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'bellum',
    name: '벨룸',
    image: '/boss_images/vellum.webp',
    difficulties: [
      { name: '노말', price: 7803000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 25500000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'crimsonqueen',
    name: '블러디퀸',
    image: '/boss_images/bloodyqueen.webp',
    difficulties: [
      { name: '노말', price: 7803000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 25500000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'pinkbean',
    name: '핑크빈',
    image: '/boss_images/pinkbean.webp',
    difficulties: [
      { name: '노말', price: 19125000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 64770000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'cygnus',
    name: '시그너스',
    image: '/boss_images/cygnus.webp',
    difficulties: [
      { name: '이지', price: 9690000, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 22950000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'lotus',
    name: '스우',
    image: '/boss_images/lotus.webp',
    difficulties: [
      { name: '노말', price: 100275000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 239487000, maxPartySize: 6, isWeekly: true },
      { name: '익스트림', price: 550650000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'damien',
    name: '데미안',
    image: '/boss_images/damien.webp',
    difficulties: [
      { name: '노말', price: 95625000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 229500000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'slime',
    name: '가디언 엔젤 슬라임',
    image: '/boss_images/slime.webp',
    difficulties: [
      { name: '노말', price: 43350000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 135000000, maxPartySize: 6, isWeekly: true }
    ]
  },
  {
    id: 'lucid',
    name: '루시드',
    image: '/boss_images/lucid.webp',
    difficulties: [
      { name: '이지', price: 60750000, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 122400000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 280800000, maxPartySize: 3, isWeekly: true }
    ]
  },
  {
    id: 'will',
    name: '윌',
    image: '/boss_images/will.webp',
    difficulties: [
      { name: '이지', price: 60750000, maxPartySize: 6, isWeekly: true },
      { name: '노말', price: 122400000, maxPartySize: 6, isWeekly: true },
      { name: '하드', price: 280800000, maxPartySize: 3, isWeekly: true }
    ]
  },
  {
    id: 'dusk',
    name: '더스크',
    image: '/boss_images/dusk.webp',
    difficulties: [
      { name: '노말', price: 165600000, maxPartySize: 6, isWeekly: true },
      { name: '카오스', price: 380700000, maxPartySize: 3, isWeekly: true }
    ]
  },
  // 일일 보스들
  {
    id: 'kaling',
    name: '카링',
    image: '/boss_images/kaling.webp',
    difficulties: [
      { name: '노말', price: 20000, maxPartySize: 6, isWeekly: false },
      { name: '하드', price: 40000, maxPartySize: 6, isWeekly: false },
      { name: '카오스', price: 60000, maxPartySize: 6, isWeekly: false }
    ]
  },
  {
    id: 'blackmage',
    name: '검은 마법사',
    image: '/boss_images/blackmage.webp',
    difficulties: [
      { name: '노말', price: 300000, maxPartySize: 6, isWeekly: false },
      { name: '하드', price: 600000, maxPartySize: 6, isWeekly: false },
      { name: '카오스', price: 900000, maxPartySize: 6, isWeekly: false }
    ]
  }
];
