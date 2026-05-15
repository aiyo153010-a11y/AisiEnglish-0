// 阅读题库 — 50篇短文
// 来源：新概念英语 / 剑桥KET / 剑桥PET / 牛津自然拼读 / Power Up
// 难度：A1(0) / A2(1) / B1(2)
// 格式：{ t: 标题, p: 短文, l: 等级, q: [{ q: 问题, o: [选项×4], a: 答案索引 }] }

const readingBank = [
  // ==================== A1 (Level 0) — 15篇 ====================
  {
    t: 'My Pet Dog',
    p: 'My name is Lucy. I am seven years old. I have a pet dog. His name is Max. Max is brown and white. He likes to play with a ball. Every day after school, I take Max for a walk in the park. I love Max very much.',
    l: 0,
    q: [
      { q: "Lucy的宠物是什么动物？", o: ['猫', '狗', '兔子', '鸟'], a: 1 },
      { q: "Max喜欢玩什么？", o: ['飞盘', '球', '绳子', '骨头'], a: 1 }
    ]
  },
  {
    t: 'At the Zoo',
    p: 'Last Saturday, Tom and his family went to the zoo. They saw many animals. The monkeys were jumping and playing. The elephants were very big. Tom\'s favourite animal was the panda. It was eating bamboo. Tom took many photos.',
    l: 0,
    q: [
      { q: "Tom一家去了哪里？", o: ['公园', '动物园', '博物馆', '海滩'], a: 1 },
      { q: "Tom最喜欢的动物是什么？", o: ['猴子', '大象', '熊猫', '老虎'], a: 2 }
    ]
  },
  {
    t: 'My Classroom',
    p: 'I study at Sunshine Primary School. My classroom is on the second floor. There are twenty desks and chairs in the room. The walls are white and there is a big blackboard. We have a reading corner with many interesting books. I like my classroom.',
    l: 0,
    q: [
      { q: "教室里有几套桌椅？", o: ['十五套', '二十套', '二十五套', '三十套'], a: 1 },
      { q: "教室里有什么特别的角落？", o: ['玩具角', '阅读角', '画画角', '音乐角'], a: 1 }
    ]
  },
  {
    t: 'A Birthday Party',
    p: 'Today is Amy\'s birthday. She is nine years old. Her mother made a big cake. Her father put up balloons. Many friends came to her house. They played games and sang songs. Amy got lots of presents. She was very happy.',
    l: 0,
    q: [
      { q: "Amy今天几岁了？", o: ['七岁', '八岁', '九岁', '十岁'], a: 2 }
    ]
  },
  {
    t: 'The Four Seasons',
    p: 'There are four seasons in a year. Spring is warm and flowers bloom. Summer is hot and we can swim. Autumn is cool and leaves fall from trees. Winter is cold and sometimes it snows. I like spring best because I can fly a kite.',
    l: 0,
    q: [
      { q: "作者最喜欢哪个季节？", o: ['春天', '夏天', '秋天', '冬天'], a: 0 },
      { q: "春天作者喜欢做什么？", o: ['游泳', '放风筝', '堆雪人', '摘果子'], a: 1 }
    ]
  },
  {
    t: 'Helping Mum',
    p: 'On Sunday morning, Ben helped his mum in the kitchen. He washed the apples and bananas. Mum cut the fruit into small pieces. They made a big fruit salad together. Dad and Ben\'s little sister said it was delicious. Ben felt very proud.',
    l: 0,
    q: [
      { q: "Ben和妈妈做了什么？", o: ['蛋糕', '水果沙拉', '三明治', '饼干'], a: 1 }
    ]
  },
  {
    t: 'My Best Friend',
    p: 'My best friend is Jack. We are in the same class. Jack is tall and has short black hair. He is good at football and maths. We always play together after school. Sometimes we do homework together too. I am happy to have a friend like Jack.',
    l: 0,
    q: [
      { q: "Jack擅长什么？", o: ['篮球和语文', '足球和数学', '游泳和英语', '跑步和音乐'], a: 1 }
    ]
  },
  {
    t: 'Going Shopping',
    p: 'Mum took Lily to the supermarket. They bought bread, eggs and milk for breakfast. They also bought some apples and oranges. Lily wanted some chocolate but Mum said no. "Too much chocolate is bad for your teeth," said Mum. Lily got a lollipop instead.',
    l: 0,
    q: [
      { q: "Lily想买什么但妈妈没同意？", o: ['苹果', '巧克力', '牛奶', '面包'], a: 1 }
    ]
  },
  {
    t: 'A Rainy Day',
    p: 'It was raining outside. Sam could not go to the park. He felt a little sad. Then his sister asked him to play a board game. They played "Snakes and Ladders" together. It was so much fun. Sam forgot about the rain and had a great time.',
    l: 0,
    q: [
      { q: "Sam和姐姐玩了什么？", o: ['电脑游戏', '桌游', '扑克牌', '拼图'], a: 1 }
    ]
  },
  {
    t: 'My New Shoes',
    p: 'Grandma bought me a pair of new shoes. They are pink with white laces. There are little stars on them. I wear them to school every day. My friend Emma says they are very pretty. I take good care of my new shoes because they are a gift from Grandma.',
    l: 0,
    q: [
      { q: "新鞋子是什么颜色的？", o: ['红色', '蓝色', '粉色', '紫色'], a: 2 }
    ]
  },
  {
    t: 'The School Bus',
    p: 'Every morning I take the yellow school bus. The driver is Mr. Wang. He is very friendly. I sit next to my friend Mike. We talk and look out of the window. The bus goes past the park and the library. It takes about fifteen minutes to get to school.',
    l: 0,
    q: [
      { q: "校车司机是谁？", o: ['王先生', '李先生', '张先生', '刘先生'], a: 0 },
      { q: "去学校大概需要多久？", o: ['五分钟', '十分钟', '十五分钟', '二十分钟'], a: 2 }
    ]
  },
  {
    t: 'Picnic in the Park',
    p: 'Last Sunday my family had a picnic in the park. We sat on a big blanket under a tree. Mum made sandwiches and Dad brought juice. My little brother chased butterflies. I read my favourite book. It was a perfect day.',
    l: 0,
    q: [
      { q: "谁在追蝴蝶？", o: ['作者', '作者妹妹', '作者弟弟', '作者妈妈'], a: 2 }
    ]
  },
  {
    t: 'The Lost Kitten',
    p: 'On her way home, Mary found a small kitten near a tree. It was white with black spots and looked very hungry. Mary gave it some milk from her bag. The kitten purred happily. Mary decided to take it home and ask Mum if she could keep it.',
    l: 0,
    q: [
      { q: "小猫是什么颜色的？", o: ['全黑', '全白', '白色带黑点', '黑色带白点'], a: 2 }
    ]
  },
  {
    t: 'My Hobby',
    p: 'I like drawing very much. I draw pictures of animals, trees and my family. My art teacher says I am good at using colours. Last week I won first prize in the school art competition. My parents were very proud of me.',
    l: 0,
    q: [
      { q: "作者的爱好是什么？", o: ['唱歌', '跳舞', '画画', '读书'], a: 2 },
      { q: "上周作者获得了什么奖？", o: ['二等奖', '一等奖', '三等奖', '参与奖'], a: 1 }
    ]
  },
  {
    t: 'Planting Flowers',
    p: 'Grandpa and I planted flowers in the garden. First we dug small holes. Then we put the seeds in and covered them with soil. Grandpa said we need to water them every day. I can\'t wait to see the beautiful flowers bloom in spring.',
    l: 0,
    q: [
      { q: "爷爷说需要每天做什么？", o: ['施肥', '浇水', '除草', '晒太阳'], a: 1 }
    ]
  },

  // ==================== A2 (Level 1) — 20篇 ====================
  {
    t: 'A Day at the Beach',
    p: 'Last summer holiday, Lucy and her family went to the beach. The weather was hot and sunny. Lucy and her brother built a big sandcastle with a flag on top. Her mother read a book under the umbrella. Her father swam in the cool sea. Later they ate ice cream and watched the sunset. Lucy said it was the best day ever. She hopes they can go again next year.',
    l: 1,
    q: [
      { q: "Lucy和谁一起堆了沙堡？", o: ['妈妈', '爸爸', '哥哥/弟弟', '姐姐/妹妹'], a: 2 },
      { q: "她们一家没有做什么？", o: ['堆沙堡', '游泳', '骑自行车', '吃冰淇淋'], a: 2 }
    ]
  },
  {
    t: 'The Clever Rabbit',
    p: 'Once upon a time, a hungry lion caught a little rabbit. "Please don\'t eat me!" cried the rabbit. "I can help you catch a bigger animal." The lion agreed. The rabbit led the lion to a deep well and pointed inside. "There is another lion down there with a big meal," said the rabbit. The lion looked into the well and saw his own reflection. Thinking it was another lion, he jumped in to fight. The clever rabbit ran away safely.',
    l: 1,
    q: [
      { q: "兔子把狮子带到了哪里？", o: ['山洞', '深井', '河流', '树林'], a: 1 },
      { q: "狮子在井里看到了什么？", o: ['另一只狮子', '自己的倒影', '一只兔子', '一条鱼'], a: 1 }
    ]
  },
  {
    t: 'Moving to a New City',
    p: 'Jack\'s father got a new job in Shanghai. The whole family had to move there. Jack felt nervous about leaving his old school and friends. On the first day at his new school, a boy named Leo smiled at him and invited him to play basketball. Jack soon made new friends. Now he loves his new school and enjoys exploring the big city with his family at weekends.',
    l: 1,
    q: [
      { q: "Jack为什么搬家？", o: ['妈妈换了工作', '爸爸换了工作', '要上更好的学校', '房子太旧了'], a: 1 },
      { q: "在新学校谁第一个和Jack交朋友？", o: ['老师', 'Leo', 'Tom', '班长'], a: 1 }
    ]
  },
  {
    t: 'Saving the Earth',
    p: 'Our class is learning about protecting the environment. Miss Chen told us that plastic bags take hundreds of years to break down in the earth. We should use cloth bags instead. She also said we should turn off lights when leaving a room and recycle paper, glass and plastic bottles. I decided to start at home. Now my family uses cloth bags for shopping and we recycle everything we can.',
    l: 1,
    q: [
      { q: "塑料袋需要多久才能分解？", o: ['几个月', '几年', '几十年', '数百年'], a: 3 },
      { q: "Miss Chen建议用什么代替塑料袋？", o: ['纸袋', '布袋', '篮子', '书包'], a: 1 }
    ]
  },
  {
    t: 'A Letter from Camp',
    p: 'Dear Mum and Dad, I am having a wonderful time at summer camp. We get up at seven o\'clock every morning and do exercises. After breakfast we have different activities. Yesterday we went hiking in the forest and saw a waterfall. Today we are going to learn how to make a campfire. The food here is not as good as Mum\'s cooking but I am eating well. I miss you both. See you next week! Love, Emma.',
    l: 1,
    q: [
      { q: "Emma在夏令营几点起床？", o: ['六点', '七点', '八点', '九点'], a: 1 },
      { q: "Emma昨天去了哪里？", o: ['海滩', '博物馆', '森林看瀑布', '游乐场'], a: 2 }
    ]
  },
  {
    t: 'The History of Ice Cream',
    p: 'Do you love ice cream? People have enjoyed cold desserts for thousands of years. The ancient Chinese mixed snow with fruit and honey. Later, the recipe travelled to Europe. In the 1600s, ice cream became popular in France and Italy. Today, there are hundreds of flavours around the world. The most popular flavour in the world is still vanilla. What is your favourite flavour?',
    l: 1,
    q: [
      { q: "古人用什么混合水果和蜂蜜？", o: ['冰', '雪', '牛奶', '奶油'], a: 1 },
      { q: "世界上最受欢迎的冰淇淋口味是什么？", o: ['巧克力', '草莓', '香草', '抹茶'], a: 2 }
    ]
  },
  {
    t: 'Learning to Ride a Bike',
    p: 'When I was six, my dad taught me to ride a bike. At first I was very scared. I fell off many times and hurt my knees. I wanted to give up but Dad encouraged me. He held the back of the seat and ran beside me. One day, I looked back and saw Dad standing far away — I was riding all by myself! That feeling of freedom was amazing. Now I ride my bike to school every day.',
    l: 1,
    q: [
      { q: "作者几岁学骑自行车？", o: ['五岁', '六岁', '七岁', '八岁'], a: 1 },
      { q: "作者回头看时发现了什么？", o: ['爸爸摔倒了', '自己一个人骑', '轮胎没气了', '链子掉了'], a: 1 }
    ]
  },
  {
    t: 'A Visit to the Dentist',
    p: 'Tom did not like going to the dentist. He had a toothache but tried to hide it from his mum. When Mum found out, she made an appointment. To Tom\'s surprise, the dentist was very kind. She showed Tom a cartoon while checking his teeth. There was a small cavity that needed filling. The dentist fixed it quickly and told Tom to brush his teeth twice a day. Tom promised he would.',
    l: 1,
    q: [
      { q: "Tom为什么试图隐瞒？", o: ['他害怕牙医', '他觉得没事', '他太忙了', '他不喜欢吃药'], a: 0 },
      { q: "牙医建议Tom每天刷几次牙？", o: ['一次', '两次', '三次', '不用刷'], a: 1 }
    ]
  },
  {
    t: 'The Great Wall',
    p: 'Last month my family visited the Great Wall of China. It is over 2,000 years old and more than 20,000 kilometres long. We climbed up many stone steps. The view from the top was breathtaking. I could see the wall stretching across the mountains like a long dragon. My dad told me it is one of the Seven Wonders of the World. I felt very proud to be Chinese standing on that ancient wall.',
    l: 1,
    q: [
      { q: "长城有多长？", o: ['超过10000公里', '超过20000公里', '超过30000公里', '超过5000公里'], a: 1 },
      { q: "作者把长城比作什么？", o: ['一条大河', '一条长龙', '一道彩虹', '一条丝带'], a: 1 }
    ]
  },
  {
    t: 'Different Ways to Celebrate New Year',
    p: 'People around the world celebrate New Year in different ways. In China, families have a big dinner together and children receive red envelopes with money. In Spain, people eat twelve grapes at midnight for good luck. In Scotland, the first person to enter a house in the new year brings gifts. In Brazil, people wear white clothes and go to the beach. How does your family celebrate New Year?',
    l: 1,
    q: [
      { q: "在西班牙，人们午夜吃几颗葡萄？", o: ['六颗', '八颗', '十二颗', '二十四颗'], a: 2 },
      { q: "在巴西，人们新年穿什么颜色的衣服？", o: ['红色', '金色', '白色', '蓝色'], a: 2 }
    ]
  },
  {
    t: 'E-books or Paper Books?',
    p: 'Nowadays many people read e-books on tablets or phones. E-books are convenient because you can carry hundreds of books in one small device. You can also change the font size and read in the dark. However, some people still prefer paper books. They enjoy the smell of paper and the feeling of turning pages. My grandma says reading a paper book is more relaxing. I like both — e-books for travelling and paper books for reading at home.',
    l: 1,
    q: [
      { q: "电子书的优点是什么？", o: ['比纸质书便宜很多', '一个设备可以携带很多本书', '不需要充电', '图片更清晰'], a: 1 },
      { q: "作者什么时候用电子书？", o: ['在家阅读时', '旅行时', '上学时', '睡觉前'], a: 1 }
    ]
  },
  {
    t: 'An Unusual Pet',
    p: 'Most people have cats or dogs as pets, but my cousin Ben has an unusual pet — a hedgehog! His name is Spike. Spike is small and has sharp spines on his back. He likes to eat fruits and vegetables. At night he runs on a little wheel in his cage. Ben says hedgehogs are easy to look after because they sleep most of the day. I think Spike is very cute but I am careful not to touch his spines.',
    l: 1,
    q: [
      { q: "Ben的宠物是什么？", o: ['猫', '狗', '刺猬', '兔子'], a: 2 },
      { q: "Spike白天大部分时间在做什么？", o: ['吃东西', '跑步', '睡觉', '玩玩具'], a: 2 }
    ]
  },
  {
    t: 'Making Pancakes',
    p: 'One rainy morning, Mum decided to teach me how to make pancakes. First we mixed flour, eggs and milk in a big bowl. Then we added a little sugar and salt. Mum heated some butter in a pan and poured the mixture in. We watched the bubbles appear on top — that meant it was time to flip! My first pancake was a bit burnt but the second one was perfect. I put honey and strawberries on top.',
    l: 1,
    q: [
      { q: "面糊里没有加什么？", o: ['面粉', '鸡蛋', '巧克力', '牛奶'], a: 2 },
      { q: "出现什么表示可以翻面了？", o: ['烟雾', '气泡', '颜色变深', '边缘卷起'], a: 1 }
    ]
  },
  {
    t: 'A Special Gift',
    p: 'Grandma\'s sixtieth birthday was coming. I wanted to give her something special. I decided to make a photo album. I collected old photos of our family — Grandma\'s wedding picture, Mum as a baby, and photos of us together. I wrote little notes under each photo. On her birthday, when Grandma opened the album, tears came to her eyes. "This is the best gift I have ever received," she said with a warm smile.',
    l: 1,
    q: [
      { q: "作者送给奶奶什么礼物？", o: ['一条围巾', '一本相册', '一件衣服', '一束花'], a: 1 }
    ]
  },
  {
    t: 'Volunteer Day',
    p: 'Last Friday our class had a volunteer day. We went to the city park to pick up rubbish. Everyone wore gloves and carried a bag. We found plastic bottles, paper and even an old shoe. After two hours of work the park looked much cleaner. A little girl came and said "thank you" to us. Our teacher said small actions can make a big difference. I felt tired but very happy.',
    l: 1,
    q: [
      { q: "志愿者活动在哪里进行？", o: ['学校', '城市公园', '海边', '街道'], a: 1 },
      { q: "工作多久后公园变得更干净了？", o: ['一小时', '一个半小时', '两小时', '三小时'], a: 2 }
    ]
  },
  {
    t: 'My Dream Job',
    p: 'When I grow up I want to be a vet. I love animals very much. At home I have two cats and a rabbit. I enjoy taking care of them. Last month our cat Mimi was sick and the vet helped her get better. I admired how gentle and knowledgeable the vet was. To become a vet I need to study hard, especially biology and chemistry. I am ready to work hard for my dream.',
    l: 1,
    q: [
      { q: "作者想成为什么？", o: ['医生', '老师', '兽医', '科学家'], a: 2 },
      { q: "成为兽医需要学好哪些科目？", o: ['语文和历史', '生物和化学', '数学和地理', '英语和美术'], a: 1 }
    ]
  },
  {
    t: 'The Power of Teamwork',
    p: 'In our PE class we had a relay race. My team was not the fastest but we had a plan. The fastest runner would go last. We practised passing the baton many times. During the race, one team dropped their baton. Another team started too fast and got tired. Our team ran steadily and passed the baton smoothly. In the end we won second place. It was not first but we were proud because we worked together so well.',
    l: 1,
    q: [
      { q: "他们的接力赛策略是什么？", o: ['最快的人跑第一棒', '最快的人跑最后一棒', '每个人随机跑', '最慢的人不跑'], a: 1 },
      { q: "他们最终获得第几名？", o: ['第一名', '第二名', '第三名', '没有名次'], a: 1 }
    ]
  },
  {
    t: 'A Mysterious Sound',
    p: 'Late one night, Sarah heard a strange sound outside her window. It was a soft scratching noise. She felt a little scared. She woke up her older brother Tom. They took a torch and went to the garden carefully. What did they find? A small hedgehog was trying to climb over a flowerpot! They both laughed. Tom gently picked up the hedgehog and moved it to a safer place. Sarah went back to bed smiling.',
    l: 1,
    q: [
      { q: "Sarah听到了什么声音？", o: ['敲门声', '脚步声', '刮擦声', '音乐声'], a: 2 },
      { q: "是什么发出了声音？", o: ['一只猫', '一只刺猬', '一只鸟', '风吹的'], a: 1 }
    ]
  },
  {
    t: 'Festivals in China',
    p: 'China has many traditional festivals. The Spring Festival is the most important one. Families get together and eat dumplings. The Mid-Autumn Festival is when we eat mooncakes and look at the full moon. The Dragon Boat Festival remembers a famous poet named Qu Yuan. People race dragon boats and eat zongzi. Lantern Festival marks the end of Spring Festival celebrations. I love all these festivals because I can spend happy time with my family.',
    l: 1,
    q: [
      { q: "中秋节人们吃什么？", o: ['饺子', '月饼', '粽子', '汤圆'], a: 1 },
      { q: "端午节纪念谁？", o: ['李白', '屈原', '杜甫', '白居易'], a: 1 }
    ]
  },
  {
    t: 'A Broken Window',
    p: 'Tom was playing football in the garden when he accidentally kicked the ball through the neighbour\'s window. He heard the glass break and felt terrible. He thought about running away but decided to be honest. He went to the neighbour\'s door and apologised. Mrs. Green was kind. She said, "Thank you for telling the truth. Accidents happen." Tom offered to pay for the repair with his pocket money. Mrs. Green smiled and said they could work it out together.',
    l: 1,
    q: [
      { q: "Tom踢球时打破了什么？", o: ['花盆', '窗户', '门', '灯'], a: 1 },
      { q: "Tom最后决定怎么做？", o: ['逃跑', '假装不知道', '诚实道歉', '让爸爸去处理'], a: 2 }
    ]
  },

  // ==================== B1 (Level 2) — 15篇 ====================
  {
    t: 'The Lost Key',
    p: 'One rainy afternoon, Emma was walking home from school. Suddenly she noticed a small golden key on the ground. It looked very old and special. She picked it up and wondered what it could open. The next day she found an old wooden box in her grandmother\'s attic. The box had a tiny lock. Emma remembered the key and ran to get it. Click! The box opened. Inside there was a beautiful necklace and a letter from her great-grandmother. Emma felt like she had discovered a hidden treasure.',
    l: 2,
    q: [
      { q: "Emma在哪里发现了这把钥匙？", o: ['学校教室里', '回家路上', '奶奶的阁楼里', '公园里'], a: 1 },
      { q: "打开盒子后里面有什么？", o: ['钱和照片', '项链和一封信', '玩具和糖果', '书本和笔记'], a: 1 }
    ]
  },
  {
    t: 'The Importance of Sleep',
    p: 'Do you get enough sleep? Scientists say that children aged 6 to 12 need nine to twelve hours of sleep every night. Sleep helps our brain remember what we learned during the day. It also helps our body grow and repair itself. If you do not sleep enough you may feel tired and find it hard to concentrate at school. Here are some tips for a good sleep: go to bed at the same time every night, avoid screens one hour before bedtime, and read a relaxing book instead.',
    l: 2,
    q: [
      { q: "6到12岁的孩子需要睡多少小时？", o: ['6-8小时', '7-10小时', '9-12小时', '10-14小时'], a: 2 },
      { q: "睡前一小时应该避免什么？", o: ['吃东西', '看屏幕', '洗澡', '听音乐'], a: 1 }
    ]
  },
  {
    t: 'A Brave Firefighter',
    p: 'Mr. Li is a firefighter. He has been doing this job for fifteen years. He has saved many lives in his career. One night a tall building caught fire. Mr. Li and his team rushed to the scene. They heard a child crying on the fifth floor. Without hesitation Mr. Li put on his equipment and ran into the burning building. Thick smoke made it hard to see but he followed the sound. He found a little girl hiding under her bed. He carried her out safely. The girl\'s mother cried with relief and thanked Mr. Li again and again.',
    l: 2,
    q: [
      { q: "Mr. Li做消防员多少年了？", o: ['十年', '十二年', '十五年', '二十年'], a: 2 },
      { q: "小女孩躲在哪里？", o: ['衣柜里', '床底下', '桌子下', '门后面'], a: 1 }
    ]
  },
  {
    t: 'Learning a New Language',
    p: 'Learning a new language is like opening a door to a new world. It takes time and practice but it is worth the effort. There are many ways to learn effectively. First try to listen to the language every day even if you don\'t understand everything. Second do not be afraid to make mistakes — they are part of learning. Third find a language partner to practise speaking with. Most importantly be patient with yourself. Every small step brings you closer to fluency. Remember even native speakers were beginners once.',
    l: 2,
    q: [
      { q: "根据文章，学语言最不该害怕什么？", o: ['听不懂', '犯错', '说慢', '写错'], a: 1 },
      { q: "文章建议找什么人练习？", o: ['老师', '家长', '语言伙伴', '笔友'], a: 2 }
    ]
  },
  {
    t: 'The First Telephone',
    p: 'Alexander Graham Bell invented the telephone in 1876. Before that people could only communicate over long distances by letter or telegraph. Bell was a teacher of deaf students and was very interested in sound. He worked with his assistant Watson to build a machine that could send voice through wires. On March 10 1876, Bell spoke the first words ever heard through a telephone: "Mr. Watson come here I want to see you." Today telephones have changed a lot. Most people carry smartphones in their pockets that can do much more than just make calls.',
    l: 2,
    q: [
      { q: "贝尔发明电话是哪一年？", o: ['1867年', '1876年', '1886年', '1896年'], a: 1 },
      { q: "贝尔通过电话说的第一句话是对谁说的？", o: ['他的妻子', '他的父亲', 'Watson', '爱迪生'], a: 2 }
    ]
  },
  {
    t: 'Giving Back to the Community',
    p: 'When Zhang Wei turned twelve, his parents suggested that instead of a big birthday party he could do something meaningful for the community. Zhang Wei liked the idea. He decided to collect books for a rural school library. He talked to his neighbours and classmates. In just two weeks he collected over three hundred books. Some people also donated money to buy new books. The rural school sent him a thank-you letter with drawings from the students. Zhang Wei said it was his best birthday ever.',
    l: 2,
    q: [
      { q: "张伟收集这些书给谁？", o: ['他自己', '城市图书馆', '农村学校', '邻居'], a: 2 },
      { q: "两周内收集了多少本书？", o: ['一百多本', '两百多本', '三百多本', '五百多本'], a: 2 }
    ]
  },
  {
    t: 'Life in the Future',
    p: 'What will life be like in fifty years? Many experts believe that technology will change our lives even more. Self-driving cars may replace traditional cars completely. Robots might do most housework in our homes. Virtual reality could let us travel to any place without leaving our room. However some things may not change. People will still need friends and family. We will still enjoy good food and beautiful music. Technology should serve us not control us. The future is exciting but the most important things in life are still love kindness and connection.',
    l: 2,
    q: [
      { q: "文章认为什么可能会取代传统汽车？", o: ['电动车', '自动驾驶汽车', '飞行汽车', '折叠汽车'], a: 1 },
      { q: "文章认为未来什么不会改变？", o: ['交通工具', '人际关系的重要性', '住房方式', '教育方式'], a: 1 }
    ]
  },
  {
    t: 'The Young Inventor',
    p: 'At just fourteen years old Lisa invented a device that helps blind people read. She got the idea after visiting her blind grandfather who struggled to read his favourite books. Lisa spent six months working on her invention after school. Her device scans printed text and reads it aloud using a computer voice. The first version was big and slow but she kept improving it. Last year she won the National Young Scientist Award. Lisa said "I just wanted to help my grandpa. I never imagined my idea would help so many people."',
    l: 2,
    q: [
      { q: "Lisa的发明帮助了哪些人？", o: ['聋人', '盲人', '老人', '儿童'], a: 1 },
      { q: "她的发明用了多久才完成第一版？", o: ['三个月', '六个月', '九个月', '一年'], a: 1 }
    ]
  },
  {
    t: 'Healthy Eating Habits',
    p: 'Good eating habits are important for growing children. Breakfast is the most important meal of the day — it gives you energy for school. Try to eat a rainbow of fruits and vegetables every day. Each colour provides different vitamins that your body needs. Avoid sugary drinks and snacks between meals. Instead drink plenty of water and eat nuts or fresh fruit if you feel hungry. Remember it is okay to have treats like cake or ice cream sometimes but they should not be part of your daily diet. A balanced diet plus regular exercise is the key to staying healthy and strong.',
    l: 2,
    q: [
      { q: "为什么早餐是最重要的？", o: ['因为它最便宜', '因为它提供一天的能量', '因为不需要准备', '因为是传统习惯'], a: 1 },
      { q: "两餐之间饿了建议吃什么？", o: ['蛋糕', '薯片', '坚果或新鲜水果', '糖果'], a: 2 }
    ]
  },
  {
    t: 'An Amazing Rescue',
    p: 'It was a cold winter morning when a dog named Lucky became a hero. Lucky\'s owner Mrs. Chen was walking him in the park when she slipped on ice and fell into the frozen lake. She could not get out because the ice kept breaking. Lucky barked loudly to get attention. When no one came he jumped into the freezing water grabbed Mrs. Chen\'s coat with his teeth and pulled her towards the shore. A passerby saw them and helped pull Mrs. Chen out. She was taken to hospital but recovered quickly thanks to her brave dog.',
    l: 2,
    q: [
      { q: "Mrs. Chen发生了什么？", o: ['被狗咬伤了', '滑倒在冰上掉进湖里', '迷路了', '心脏病发作'], a: 1 },
      { q: "Lucky如何救主人？", o: ['跑去叫别人', '打电话求救', '跳进水里拉她上岸', '在岸边等待'], a: 2 }
    ]
  },
  {
    t: 'The Art of Paper Cutting',
    p: 'Chinese paper cutting is a traditional art with a history of over 1,500 years. Artists use scissors or knives to cut beautiful patterns from red paper. The designs often show flowers animals or Chinese characters for good luck. Paper cutting requires great skill and patience. One small mistake can ruin the whole piece. In the past every girl was expected to learn paper cutting. Today this art is recognised as an important part of Chinese cultural heritage. Many schools now offer paper cutting classes to help keep this tradition alive.',
    l: 2,
    q: [
      { q: "中国剪纸有多少年历史？", o: ['超过500年', '超过1000年', '超过1500年', '超过2000年'], a: 2 },
      { q: "为什么现在学校开设剪纸课？", o: ['为了让学生得奖', '为了传承传统文化', '为了训练手部肌肉', '为了装饰教室'], a: 1 }
    ]
  },
  {
    t: 'Overcoming Fear',
    p: 'Everyone feels afraid sometimes. Fear is a natural feeling that helps protect us from danger. However sometimes fear stops us from doing things we really want to do. When I was younger I was terribly afraid of speaking in front of the class. My voice would shake and I would forget my words. My teacher gave me great advice: "Start small. Speak to one friend then a small group then the whole class." I followed her advice and practised every day. It was not easy but gradually I became more confident. Last month I gave a speech at the school assembly and everyone clapped.',
    l: 2,
    q: [
      { q: "作者以前害怕什么？", o: ['考试', '在班级面前讲话', '体育比赛', '和陌生人交谈'], a: 1 },
      { q: "老师给的建议是什么？", o: ['放弃尝试', '从小范围开始练习', '吃药缓解', '让别人帮忙'], a: 1 }
    ]
  },
  {
    t: 'Amazing Underwater World',
    p: 'The ocean covers more than seventy percent of our planet yet we have explored only about five percent of it. The underwater world is full of amazing creatures. Some fish can change colour to hide from enemies. The blue whale is the largest animal that has ever lived — bigger than any dinosaur. Deep in the ocean where sunlight cannot reach there are strange creatures that make their own light. Scientists discover new species in the ocean every year. Protecting our oceans is important because they provide food and oxygen for the whole planet.',
    l: 2,
    q: [
      { q: "海洋覆盖了地球多少面积？", o: ['约50%', '约60%', '超过70%', '超过80%'], a: 2 },
      { q: "深海中有光是因为什么？", o: ['阳光照射', '生物自己发光', '潜水艇灯光', '海底火山'], a: 1 }
    ]
  },
  {
    t: 'A Journey to Remember',
    p: 'During the summer holiday my family went on a train journey across three provinces. We saw the landscape change from green rice fields to rocky mountains to busy cities. The best part was meeting different people on the train. An old man told us stories about his village. A young mother shared her homemade biscuits with us. A university student taught me a new card game. I learned that the journey itself can be as wonderful as the destination. Next year I hope we can take the train to Tibet.',
    l: 2,
    q: [
      { q: "作者一家穿越了几个省份？", o: ['两个', '三个', '四个', '五个'], a: 1 },
      { q: "作者从这次旅行中学到了什么？", o: ['火车太慢了', '旅程本身可以和目的地一样美好', '最好不要和陌生人说话', '自驾比火车更好'], a: 1 }
    ]
  },
  {
    t: 'The Power of Kindness',
    p: 'A small act of kindness can change someone\'s day or even their life. Last winter I saw an old woman struggling to carry her heavy shopping bags in the snow. I offered to help. She smiled and we walked together to her home which was not far away. She told me she had just lost her husband and felt very lonely. I started visiting her once a week. We talk drink tea and sometimes I help her with shopping. She says our weekly chat is the highlight of her week. I did not expect that a simple offer of help would lead to such a meaningful friendship.',
    l: 2,
    q: [
      { q: "作者在什么天气下帮助了老人？", o: ['下雨天', '下雪天', '大风天', '晴天'], a: 1 },
      { q: "现在作者多久去看望一次老人？", o: ['每天', '每周一次', '每月一次', '每年一次'], a: 1 }
    ]
  }
]

export default readingBank
