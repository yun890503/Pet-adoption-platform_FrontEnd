const dogImages = [
  [
    'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',
  ],
];

const catImages = [
  [
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80',
  ],
  [
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1536589961747-e239b2abbec2?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=900&q=80',
  ],
];

const rescueStories = [
  '牠被志工在雨天帶回中心，剛開始很緊張，現在已經會主動靠近人撒嬌。',
  '牠曾在街頭流浪一段時間，經過照護後恢復健康，正在等待一個穩定的家。',
  '牠原本因家庭變故來到中心，個性溫柔，很適合願意慢慢陪伴的新家人。',
];

const baseDogs = [
  ['麻糬', '貴賓犬', '1歲', '男生', '活潑親人，喜歡撒嬌與散步。'],
  ['布丁', '柴犬', '2歲', '女生', '聰明勇敢，對熟人非常忠心。'],
  ['可可', '臘腸犬', '3歲', '男生', '溫和友善，喜歡趴在身邊陪伴。'],
  ['豆花', '比熊犬', '1歲', '女生', '活潑好動，親人又愛乾淨。'],
  ['拿鐵', '米克斯', '4歲', '男生', '穩定親切，適合第一次養狗家庭。'],
  ['小虎', '黃金獵犬', '5歲', '男生', '親人穩重，喜歡球類遊戲。'],
  ['芋圓', '柯基', '2歲', '女生', '外向愛笑，看到人會開心搖尾巴。'],
  ['焦糖', '博美犬', '3歲', '女生', '警覺聰明，熟悉後很黏人。'],
  ['旺財', '拉布拉多', '6歲', '男生', '沉穩溫柔，很會照顧小朋友。'],
  ['米香', '邊境牧羊犬', '2歲', '女生', '學習力強，適合喜歡戶外活動的人。'],
];

const baseCats = [
  ['小橘', '米克斯貓', '8個月', '男生', '親人愛玩，好奇心強。'],
  ['咪咪', '米克斯貓', '1歲', '女生', '聰明親人，喜歡坐在窗邊。'],
  ['雪球', '波斯貓', '3歲', '女生', '安靜優雅，喜歡被輕輕梳毛。'],
  ['芝麻', '英國短毛貓', '2歲', '男生', '慢熟穩定，熟了會主動討摸。'],
  ['奶茶', '暹羅貓', '4歲', '女生', '愛聊天，喜歡和人互動。'],
  ['花生', '虎斑貓', '6個月', '男生', '精力充沛，玩逗貓棒玩不膩。'],
  ['糖糖', '三花貓', '2歲', '女生', '溫柔黏人，喜歡安靜環境。'],
  ['啾啾', '曼赤肯', '1歲', '男生', '撒嬌愛跟路，適合陪伴型家庭。'],
  ['豆沙', '俄羅斯藍貓', '5歲', '女生', '安靜細膩，適合規律生活。'],
  ['阿福', '緬因貓', '3歲', '男生', '大方溫順，喜歡被陪伴。'],
];

function ageValue(age) {
  if (age.includes('個月')) return Number.parseInt(age, 10) / 12;
  return Number.parseInt(age, 10);
}

function createAnimal(row, index, type) {
  const id = type === 'dog' ? index + 1 : index + 11;
  const imagePool = type === 'dog' ? dogImages : catImages;
  return {
    id,
    name: row[0],
    type,
    breed: row[1],
    age: row[2],
    ageValue: ageValue(row[2]),
    gender: row[3],
    personality: row[4],
    healthStatus: index % 3 === 0 ? '良好，已施打疫苗' : index % 3 === 1 ? '良好，已完成結紮' : '良好，定期追蹤照護',
    vaccineInfo: index % 2 === 0 ? '核心疫苗已完成，下一次補強依獸醫建議安排。' : '已完成基礎疫苗，入住前會再次確認健康紀錄。',
    neutered: index % 3 === 1 || index > 5 ? '已結紮' : '尚未結紮，中心可協助安排評估',
    rescueStory: rescueStories[index % rescueStories.length],
    createdAt: `2026-06-${String(17 - (id % 12)).padStart(2, '0')}`,
    images: imagePool[index % imagePool.length],
  };
}

export const animals = [
  ...baseDogs.map((row, index) => createAnimal(row, index, 'dog')),
  ...baseCats.map((row, index) => createAnimal(row, index, 'cat')),
];
