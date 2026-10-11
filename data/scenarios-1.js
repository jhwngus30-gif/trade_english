// 상황 데이터 1/2: 거래 시작 · 문의·견적 · 계약·주문
// 형식: id, stage(거래 단계), imp(기본 중요도 1~3), title, en, sit(상황 설명), q(질문),
//       exp[[영어, 한국어, 자동 체크용 키워드]], a[1~5단계 모범 답변], t[1~5단계 포인트]
// 답변 안의 {name} {first} {company} {products} {item} {feature}는 사용자가 입력한 정보로 바뀝니다.
(window.SCENARIOS = window.SCENARIOS || []).push(

/* ---------------- 거래 시작 ---------------- */
{ id:'intro', stage:'start', imp:3, title:'회사·제품 소개', en:'Introducing Your Company',
  sit:'해외 잠재 바이어와의 첫 미팅. 회사와 주력 제품을 소개해야 합니다.',
  q:"A potential buyer from abroad asks you to introduce your company and its main products. Please go ahead.",
  exp:[
    ["We specialize in ~.", "저희는 ~을 전문으로 합니다.", "specialize in"],
    ["We've been in business for over ten years.", "저희는 10년 넘게 사업을 해왔습니다.", "in business"],
    ["Our main products include ~.", "주력 제품으로는 ~이 있습니다.", "main products"],
    ["We currently export to more than 20 countries.", "현재 20개국 이상에 수출하고 있습니다.", "export to"],
    ["What sets us apart is ~.", "저희의 차별점은 ~입니다.", "sets us apart"],
    ["I'd be happy to send you our catalog.", "카탈로그를 기꺼이 보내드리겠습니다.", "happy to send"]
  ],
  a:[
    "Hello, I'm {name}. I work for {company}. We make {products}. We export to many countries. Thank you.",
    "Hello, I'm {name} from {company}. Our company makes {products}. Our main product is the {item}. We export to many countries, like the U.S. and Japan. Our products are high quality, but they are not expensive. I can send you our catalog. Thank you.",
    "Nice to meet you. I'm {name}, sales manager at {company}. We specialize in {products}, and we've been in business for about twelve years. Our main products include the {item} and several related models. Right now, we export to over twenty countries, mainly in North America and Southeast Asia. What sets us apart is that we handle everything from design to production in our own factory, so our quality stays consistent. If you're interested, I'd be happy to send you our latest catalog and price list.",
    "Thank you for taking the time to meet with us. I'm {name}, and I head the overseas sales team at {company}. In a nutshell, we're a mid-sized manufacturer that specializes in {products}. Over the past twelve years in business, we've grown from a domestic supplier into a company that exports to more than twenty markets, with North America accounting for roughly forty percent of our revenue. What really sets us apart is that we're vertically integrated. Design, production, and quality control all happen under one roof, which lets us respond quickly to custom orders without compromising on quality. That said, I'd love to hear more about your business first, so I can point you to the product lines that make the most sense for your market.",
    "Thank you for having us today. I'm {name}, Director of Global Sales at {company}. Before I dive in, I'd like to frame this around what I understand your priorities to be: consistent quality, reliable lead times, and the flexibility to stand out in your market. We manufacture {products}, we've been in business for twelve years, and we currently export to more than twenty markets. North America is our largest region, at roughly forty percent of revenue, so we're very familiar with the compliance and packaging requirements there. What genuinely sets us apart is our vertically integrated model. Because design, production, and quality control sit under one roof, we've kept our defect rate below half a percent while turning around custom designs in as little as six weeks. Rather than walk you through our entire catalog, I'd suggest we focus on two or three lines that fit your current range, and I'd be happy to send samples tailored to those afterward. Does that sound like a good use of our time?"
  ],
  t:[
    "I'm ~ / I work for ~ / We make ~. 이 세 문장 패턴만 익혀도 자기소개가 됩니다.",
    "이름 → 회사 → 제품 → 수출국 → 마무리 순서만 지켜도 충분합니다.",
    "수치(12년, 20개국)와 차별점 1개를 넣으면 답변이 단단해집니다.",
    "마지막에 상대 이야기로 대화를 넘기면 일방적인 소개가 아니라 대화가 됩니다.",
    "상대의 우선순위를 먼저 짚고, 회사 소개를 거기에 맞춰 구성하는 것이 고급 프레젠테이션입니다."
  ]
},

{ id:'show', stage:'start', imp:2, title:'전시회 부스 응대', en:'At a Trade Show',
  sit:'해외 전시회 부스에 방문객이 들렀습니다. 대화를 시작하고 연락처를 받아보세요.',
  q:"You're at an international trade show, and a visitor stops by your booth. Start a conversation and try to get their contact information.",
  exp:[
    ["Feel free to take a look around.", "편하게 둘러보세요.", "look around"],
    ["What brings you to the show?", "전시회에는 어떤 일로 오셨어요?", "brings you"],
    ["Are you looking for anything in particular?", "특별히 찾으시는 게 있으세요?", "in particular"],
    ["Here's my business card.", "제 명함입니다.", "card"],
    ["Would you mind if I followed up with you by email?", "이메일로 후속 연락을 드려도 될까요?", "follow"]
  ],
  a:[
    "Hello, welcome! Please look around. Here is my business card. Can I have your card?",
    "Hello, welcome to our booth. Please look around. We make {products}. What are you looking for? This is our new {item}. It is {feature}. Here is my business card. Can I have your card too? I will send you an email.",
    "Hi there, welcome to our booth! Feel free to take a look around. What brings you to the show? Oh, you run a chain of stores in Canada? Then you might be interested in our new {item}. It's {feature}, and it's been very popular with our customers. Here's my business card. Would you mind if I followed up with you by email next week with our catalog?",
    "Hi, thanks for stopping by! Are you looking for anything in particular, or just getting a feel for what's new this year? Oh, interesting, so you're sourcing for a chain of stores in Canada. In that case, I'd love to show you our new {item}. It's {feature}, and it's been doing really well with retailers who target younger customers. That's something shoppers notice the moment they see it in person. I know you probably have a lot of booths to get through, so I won't keep you. Would it be alright if I followed up with pricing for the Canadian market? Here's my card.",
    "Hi there, thanks for stopping by. Are you looking for anything in particular, or just exploring what's new this year? Ah, so you're sourcing for a chain of stores in Canada. That's great timing, actually. We've just launched a new {item} designed with retailers like yours in mind. Our partners in the U.S. have found it resonates especially well with younger customers, mainly because it's {feature}. I should also mention that we already meet Canadian labeling requirements, so there wouldn't be any extra work on that front. I know you have a lot of ground to cover today, so I won't keep you. Here's my business card. Would you mind if I followed up next week with pricing for the Canadian market and a couple of case studies? And if your schedule allows, I'd be glad to set up a short video call with our product team."
  ],
  t:[
    "Welcome / Please look around / Here is my card. 부스 응대의 기본 세 문장입니다.",
    "인사 → 제품 하나 소개 → 명함 교환. 짧아도 흐름이 있으면 됩니다.",
    "상대의 답(캐나다 매장)에 맞춰 제품을 추천하는 연결이 포인트입니다.",
    "“I won't keep you”처럼 상대의 시간을 배려하는 표현이 자연스러운 고급 화법입니다.",
    "다른 고객 사례와 구매 장벽 제거(규격 충족)를 함께 언급하면 설득력이 커집니다."
  ]
},

{ id:'coldcall', stage:'start', imp:2, title:'신규 바이어 첫 연락', en:'Cold-Calling a New Buyer',
  sit:'온라인에서 찾은 해외 수입업체 구매 담당자에게 처음 전화를 겁니다.',
  q:"You found a potential importer online. Call their purchasing manager for the first time and briefly introduce your company.",
  exp:[
    ["I'm calling from ~.", "~에서 연락드렸습니다.", "calling from"],
    ["I came across your company on ~.", "~에서 귀사를 알게 되었습니다.", "came across"],
    ["Is this a good time to talk?", "지금 통화 괜찮으세요?", "good time"],
    ["I'll keep it brief.", "짧게 말씀드리겠습니다.", "brief"],
    ["Would you be the right person to speak with?", "이 건은 담당자님과 이야기하면 될까요?", "right person"],
    ["Could I send you some information by email?", "이메일로 자료를 보내드려도 될까요?", "by email"]
  ],
  a:[
    "Hello, this is {name} from {company} in Korea. We make {products}. Is this a good time to talk? Can I send you our catalog by email?",
    "Hello, my name is {name}, and I'm calling from {company} in Korea. I found your company on the internet. We make {products}. Is this a good time to talk? I think our products can be good for your business. Can I send you some information by email?",
    "Hi, my name is {name}, and I'm calling from {company} in Korea. I came across your company on a trade platform, and I noticed you import {products}. Is this a good time to talk? I'll keep it brief. We're a manufacturer with over ten years of export experience, and our {item} is {feature}. I'd like to send you our catalog and a price list. Could I have your email address?",
    "Hi, this is {name} calling from {company} in Korea. I hope I'm not catching you at a bad time. I'll keep it brief. I came across your company on a trade platform, and it looks like you've been expanding your range of {products}. We're a manufacturer that supplies several importers in your region, and I thought there might be a good fit. Our {item}, in particular, is {feature}, which tends to work well for retailers like your customers. Would you be the right person to speak with about new suppliers? If so, could I send you a short introduction and our price list by email?",
    "Hi, this is {name} calling from {company} in Korea. Is this a good time to talk for two minutes? I'll keep it brief. I came across your company while researching importers of {products} in your region, and I noticed you've recently added several new brands to your range. The reason I'm calling is that we currently supply two distributors in neighboring markets, and they've seen strong sales with our {item}, largely because it's {feature}. I'm not expecting a decision today, of course. What I'd like to do is send you a one-page introduction, along with a price list and our references, so you can see whether it's worth a closer look. If it makes more sense to speak with someone else on your team, I'd really appreciate it if you could point me to the right person. What would be the best email address to use?"
  ],
  t:[
    "이름 → 회사 → 제품 → 자료 제안. 네 문장이면 첫 연락이 됩니다.",
    "“Is this a good time to talk?”로 상대의 시간을 먼저 물어보세요.",
    "어떻게 알게 됐는지(came across)를 말하면 스팸 전화처럼 들리지 않아요.",
    "결정권자가 맞는지 확인하는 질문(right person)이 실무의 핵심입니다.",
    "오늘 결정을 바라지 않는다고 말해 부담을 낮추고, 다음 행동(이메일)을 구체적으로 요청하세요."
  ]
},

{ id:'visit', stage:'start', imp:1, title:'바이어 공장 방문 응대', en:'Hosting a Factory Visit',
  sit:'해외 바이어가 공장을 방문했습니다. 맞이하고 생산 라인을 안내하세요.',
  q:"A buyer is visiting your factory for the first time. Welcome them and give a short tour of your production line.",
  exp:[
    ["Welcome to our factory.", "저희 공장에 오신 걸 환영합니다.", "welcome"],
    ["How was your flight?", "비행은 어떠셨어요?", "flight"],
    ["Let me show you around.", "제가 안내해 드리겠습니다.", "show you around"],
    ["This is where we ~.", "이곳에서 ~을 합니다.", "this is where"],
    ["We inspect every unit before packing.", "포장 전 모든 제품을 검사합니다.", "inspect"],
    ["Please feel free to ask any questions.", "궁금한 점은 편하게 물어보세요.", "any questions"]
  ],
  a:[
    "Welcome to our factory! How was your flight? Let me show you around. This is our production line. Please ask me any questions.",
    "Welcome to our factory. It's nice to see you in person. How was your flight? Let me show you around. This is where we make the {item}. Here, we check the quality of every product. Please feel free to ask any questions.",
    "Welcome to {company}! It's great to finally meet you in person. How was your flight? Let me show you around our factory. This is where we make the {item}. We have three production lines, and we can produce about 20,000 units a month. Over here is our quality control area. We inspect every unit before packing, so defects are very rare. Please feel free to ask any questions as we go.",
    "Welcome to {company}. It's really great to finally meet you in person after all those emails. I hope the trip wasn't too tiring. Let me show you around. We'll start with the production area, where we make the {item}. We run three lines here, with a total capacity of about 20,000 units a month, so we have plenty of room to grow with you. Next is our quality control area, which I think you'll find interesting. Every unit is inspected before packing, and we keep records by batch, so we can trace any issue back to its source. Please don't hesitate to stop me if you have any questions along the way.",
    "Welcome to {company}. It's a real pleasure to finally meet you in person, and thank you for making the trip all the way to Korea. I hope the flight wasn't too exhausting. I've planned about an hour for the tour, followed by a meeting with our production manager, but please let me know if you'd like to spend more time in any particular area. We'll begin with the production area, where we make the {item}. We run three lines with a combined capacity of around 20,000 units a month, and we're currently operating at about seventy percent, so we could take on a larger order without affecting lead times. After that, I'll show you our quality control area. Every unit is inspected before packing, and each batch has its own record, so if an issue ever comes up, we can trace it back within hours. Please feel free to ask any questions as we go, and you're more than welcome to take photos."
  ],
  t:[
    "Welcome → 안부 → 안내. 기본 인사 세 문장부터 익히세요.",
    "“This is where we ~” 패턴으로 장소마다 한 문장씩 설명해 보세요.",
    "생산 능력(월 2만 개) 같은 숫자를 넣으면 신뢰가 생깁니다.",
    "바이어 입장의 이점(함께 성장할 여유, 추적 가능성)으로 설명을 연결하세요.",
    "일정 안내로 시작하고, 가동률처럼 바이어가 궁금해할 정보를 먼저 제시하세요."
  ]
},

/* ---------------- 문의·견적 ---------------- */
{ id:'inquiry', stage:'quote', imp:3, title:'제품 문의 응대', en:'Handling a Product Inquiry',
  sit:'바이어가 제품 사양, 최소 주문 수량(MOQ), 납기를 묻습니다.',
  q:"A buyer calls and asks about your product specifications, minimum order quantity, and lead time. Please respond.",
  exp:[
    ["Thank you for your interest in our products.", "저희 제품에 관심 가져 주셔서 감사합니다.", "interest in"],
    ["Our minimum order quantity is 500 units.", "최소 주문 수량은 500개입니다.", "minimum order"],
    ["The lead time is about four weeks.", "납기는 약 4주입니다.", "lead time"],
    ["It comes in three versions.", "세 가지 버전으로 나옵니다.", "comes in"],
    ["Private labeling is available for orders over 1,000 units.", "1,000개 이상 주문 시 자체 브랜드(OEM) 제작이 가능합니다.", "private label"],
    ["Could you tell me the quantity you have in mind?", "생각하고 계신 수량을 알려주시겠어요?", "have in mind"]
  ],
  a:[
    "Thank you for your call. The minimum order is 500 units. It takes about four weeks. The {item} comes in three versions.",
    "Thank you for your call. The minimum order is 500 units. We need about four weeks to make the products. The {item} comes in three versions. If you want, we can put your logo on the products. How many do you need?",
    "Thank you for your interest in our products. To answer your questions, our minimum order quantity is 500 units per model, and the lead time is usually about four weeks after we confirm the order. The {item} comes in three versions, and we also offer private labeling for orders over 1,000 units. Could you tell me roughly what quantity you have in mind? That way, I can give you a more accurate quote.",
    "Thanks so much for reaching out. Let me go through your questions one by one. Our standard minimum order is 500 units per model, although we can be a bit flexible for a first trial order. As for lead time, it's typically around four weeks from order confirmation, but that can stretch to six during our peak season in the fall, so I'd recommend planning ahead. In terms of specs, the {item} comes in three versions, and private labeling is available for orders above 1,000 units. If you could share your target quantity and timeline, I'll put together a tailored quote and send over samples so you can check the quality firsthand.",
    "Thanks for reaching out, and I appreciate how specific your questions are. It makes it much easier to give you a useful answer. On minimum order quantity, our standard is 500 units per model. That said, for a first order we're happy to split that across two or three models, so you can test the market without overcommitting. Regarding lead time, it's typically four weeks from order confirmation. However, I'll be upfront that our fall peak can push that to six, so if you're targeting the holiday season, placing the order by early September would give us a comfortable margin. On specifications, the {item} comes in three versions, and private labeling is available above 1,000 units, including custom packaging. To make sure I recommend the right configuration, could you tell me a bit about your target price point and the customer you have in mind? With that, I can put together a proposal and ship samples within the week."
  ],
  t:[
    "숫자(500개, 4주)를 또박또박 말하는 연습부터 하세요.",
    "질문 3개(사양·MOQ·납기)에 하나씩 답하면 됩니다.",
    "“To answer your questions,” 같은 도입 문장으로 답변을 정리해 보세요.",
    "예외 조건(첫 주문은 유연하게, 성수기엔 6주)을 덧붙이면 실무 감각이 드러납니다.",
    "답변 전에 질문을 인정하고, 마지막엔 상대 정보를 되물어 제안으로 연결하세요."
  ]
},

{ id:'sample', stage:'quote', imp:3, title:'샘플 요청·발송', en:'Sending Samples',
  sit:'바이어가 주문 전에 샘플을 요청했습니다. 샘플 비용과 발송 조건을 안내하세요.',
  q:"A buyer asks you to send samples before placing an order. Explain your sample policy and how you will send them.",
  exp:[
    ["We'd be happy to send you samples.", "기꺼이 샘플을 보내드리겠습니다.", "send you samples"],
    ["The samples are free of charge.", "샘플은 무료입니다.", "free of charge"],
    ["Could you cover the shipping cost?", "배송비는 부담해 주실 수 있을까요?", "shipping cost"],
    ["Do you have a courier account number?", "특송(쿠리어) 계정 번호가 있으신가요?", "courier"],
    ["We'll deduct the sample cost from your first order.", "샘플 비용은 첫 주문에서 차감해 드립니다.", "deduct"],
    ["I'll send you the tracking number.", "운송장 번호를 보내드리겠습니다.", "tracking number"]
  ],
  a:[
    "Sure, we'd be happy to send you samples. The samples are free. Could you pay for the shipping? I will send them this week.",
    "Sure, we'd be happy to send you samples of the {item}. The samples are free of charge, but could you cover the shipping cost? If you have a courier account number, please send it to me. I will send the samples this week and give you the tracking number.",
    "Of course, we'd be happy to send you samples. We can send up to three samples of the {item} free of charge. For shipping, we usually ask buyers to cover the cost. If you have a DHL or FedEx account number, we can use that. Otherwise, we can pay first and add it to the invoice. The samples will be ready in three days, and I'll send you the tracking number as soon as they're shipped.",
    "Absolutely. Seeing the product in person is the best way to judge the quality, so we'd be happy to send you samples. We provide up to three samples of the {item} free of charge. As for shipping, our usual policy is for the buyer to cover the courier cost, so if you have a DHL or FedEx account number, we'll ship it on your account. If not, we can prepay the shipping and deduct it from your first order, so it effectively costs you nothing if you go ahead. The samples should be ready within three days, and I'll send you the tracking number once they're on the way. Could you also let me know which versions you'd like to see?",
    "Absolutely. I think testing the {item} yourself is the best way to evaluate us, so we'd be glad to send you samples. Before we do, could you let me know which versions you're most interested in and how you plan to test them? If you're going to run lab tests, for example, I'll include our latest test reports so you can compare the results directly. Up to three samples are free of charge. For shipping, we usually ask buyers to cover the courier cost, ideally through your DHL or FedEx account number. If that's inconvenient, we're happy to prepay it, and we'll deduct the amount from your first order. The samples will be ready within three days, and I'll send you the tracking number right away. Once they arrive, I'd suggest we schedule a short call to go over your feedback, so we can make any adjustments before you place an order."
  ],
  t:[
    "무료 여부와 배송비 부담자. 이 두 가지가 샘플 대화의 핵심입니다.",
    "courier account number(특송 계정)는 실무에서 매우 자주 쓰는 표현이에요.",
    "선불 후 청구 같은 대안을 함께 제시하면 바이어가 결정하기 쉬워집니다.",
    "“첫 주문에서 차감”은 샘플 비용 문제를 부드럽게 해결하는 단골 조건입니다.",
    "샘플을 보내기 전에 테스트 목적을 묻고, 받은 후의 피드백 일정까지 제안하세요."
  ]
},

{ id:'quote', stage:'quote', imp:3, title:'견적 설명', en:'Explaining a Quotation',
  sit:'바이어에게 보낸 견적서를 전화로 설명합니다. 단가, 조건, 유효기간을 안내하세요.',
  q:"You sent a quotation to a buyer. Walk them through the main points of the quote, including price, terms, and validity.",
  exp:[
    ["Let me walk you through the quotation.", "견적서를 차근차근 설명드리겠습니다.", "walk you through"],
    ["The unit price is 12 dollars, FOB Busan.", "단가는 부산항 FOB 기준 12달러입니다.", "unit price"],
    ["The price includes ~.", "가격에는 ~이 포함되어 있습니다.", "includes"],
    ["We offer a volume discount for orders over ~.", "~개 이상 주문 시 수량 할인이 있습니다.", "volume discount"],
    ["This quotation is valid for 30 days.", "이 견적은 30일간 유효합니다.", "valid"],
    ["Please let me know if you have any questions.", "궁금한 점이 있으면 알려주세요.", "any questions"]
  ],
  a:[
    "Let me explain our quotation. The unit price is 12 dollars, FOB Busan. The price is valid for 30 days. Do you have any questions?",
    "Did you get our quotation? Let me explain it. The unit price of the {item} is 12 dollars, FOB Busan. The price includes standard packaging. If you order more than 3,000 units, we give a discount. This quotation is valid for 30 days. Please let me know if you have any questions.",
    "Thank you for reviewing our quotation. Let me walk you through the main points. The unit price of the {item} is 12 dollars, FOB Busan, and that includes standard export packaging. For orders over 3,000 units, we offer a volume discount of 5 percent. The lead time is about four weeks after we receive the deposit. Please note that this quotation is valid for 30 days, because raw material prices have been changing quickly. Please let me know if you have any questions.",
    "Thanks for taking the time to go over the quotation with me. Let me walk you through the key points. The unit price for the {item} is 12 dollars, FOB Busan, which includes standard export packaging and pre-shipment inspection. If you're thinking about larger volumes, we offer a volume discount of 5 percent above 3,000 units, and 8 percent above 5,000. In terms of timing, production takes about four weeks from receipt of the deposit. One thing I'd like to point out is that the quote is valid for 30 days. Raw material costs have been fairly volatile lately, so we can't hold prices much longer than that. If you'd like to see a CIF price to your port as well, I'd be happy to prepare one.",
    "Thank you for reviewing our quotation so quickly. I'd like to walk you through it, mainly so that you can compare it fairly with any other offers you may have. The unit price of the {item} is 12 dollars, FOB Busan. Unlike some suppliers, that figure already includes export packaging, pre-shipment inspection, and labeling in your language, so there are no hidden costs on our side. For volume, we offer tiered discounts of 5 percent above 3,000 units and 8 percent above 5,000. Production takes about four weeks after we receive the deposit. I should also highlight the validity period, which is 30 days. Material prices have been volatile, and I'd rather be transparent about that than quote a price we can't honor later. If it would help your internal review, I can also prepare a CIF quote to your port, so you can see the full landed cost. Which would be more useful for you?"
  ],
  t:[
    "단가·조건·유효기간. 견적의 세 가지 핵심 숫자를 정확히 말하세요.",
    "“The price includes ~”로 포함 내역을 알려주면 오해가 줄어요.",
    "유효기간의 이유(원자재 가격 변동)를 덧붙이면 설득력이 생깁니다.",
    "할인 구간을 단계별로 제시하고, CIF 같은 다른 조건의 견적을 먼저 제안해 보세요.",
    "숨은 비용이 없다는 점을 강조해 경쟁사와 공정하게 비교하도록 유도하세요."
  ]
},

{ id:'price', stage:'quote', imp:3, title:'가격 협상', en:'Price Negotiation',
  sit:'바이어가 경쟁사보다 비싸다며 15% 할인을 요구합니다.',
  q:"The buyer says your price is too high compared to a competitor and asks for a fifteen percent discount. How would you negotiate?",
  exp:[
    ["I understand your concern about the price.", "가격에 대한 우려는 이해합니다.", "concern"],
    ["Our price reflects ~.", "저희 가격에는 ~이 반영되어 있습니다.", "reflects"],
    ["The best we can do is 5% off.", "저희가 해드릴 수 있는 최선은 5% 할인입니다.", "best we can do"],
    ["If you could increase the order, we could offer more.", "주문량을 늘려주시면 더 해드릴 수 있습니다.", "if you could"],
    ["Let's meet halfway.", "중간에서 타협하죠.", "halfway"],
    ["Would that work for you?", "그렇게 하면 괜찮으시겠어요?", "work for you"]
  ],
  a:[
    "I understand. But our quality is very good. We can give you 5 percent off. Is that okay?",
    "I understand. Our price is a little high, but our quality is very good. We cannot give you 15 percent. We can give you 5 percent. If you order more, we can give you a bigger discount. What do you think?",
    "I understand your concern about the price. But our price reflects the higher-grade materials we use and our strict quality checks. Unfortunately, a 15 percent discount is difficult for us. The best we can do right now is 5 percent. However, if you could increase your order to 3,000 units, we could offer 8 percent. I think that's a fair deal for both of us.",
    "I appreciate you being upfront about that, and I understand you need to justify the cost on your end. To be fair, though, I'm not sure we're comparing apples to apples. Our competitor uses lower-grade materials, and our defect rate is under half a percent. So a 15 percent cut would mean compromising on exactly what makes our products worth buying. What I can do is offer 5 percent off this order, and if you're able to commit to 3,000 units or a one-year supply agreement, we could go up to 8 percent. Would that kind of structure work for you?",
    "I really appreciate your candor, and I'd rather we talk openly about this now than have it become a sticking point later. Let me share how we look at it. A fifteen percent reduction would take us below what it costs to maintain our current material grade and inspection process, and I don't think either of us wants a product that generates returns and damages your brand. So rather than simply cutting the unit price, I'd like to look at the total cost of the partnership. Our price reflects a defect rate under half a percent, which typically saves our partners two to three percent in returns and handling. With that in mind, here's what I can propose. We'll take five percent off this initial order as a goodwill gesture, and if you're able to commit to 3,000 units over the next year, we could lock in an eight percent discount, along with priority production slots during peak season. Let's meet halfway on a structure that works for both of us. Would that be something you could take back to your team?"
  ],
  t:[
    "“But” 한 단어로 반대 의견을 부드럽게 시작할 수 있어요.",
    "거절만 하지 말고 대안(5%)을 꼭 함께 말하세요.",
    "공감 → 가격 근거 → 거절 → 조건부 대안의 4단 구조를 연습하세요.",
    "“To be fair, though” 같은 완곡한 반박과, 조건을 묶은 제안이 핵심입니다.",
    "단가 대신 총비용 관점으로 프레임을 바꾸는 것이 고급 협상 기술입니다."
  ]
},

{ id:'increase', stage:'quote', imp:2, title:'단가 인상 통보', en:'Announcing a Price Increase',
  sit:'원자재 가격과 운임 상승으로 다음 주문부터 단가를 7% 올려야 합니다.',
  q:"Due to rising raw material and freight costs, you need to raise your prices by seven percent starting with the next order. Inform your buyer.",
  exp:[
    ["I'm calling to let you know about ~.", "~에 대해 알려드리려고 연락드렸습니다.", "let you know"],
    ["Raw material costs have gone up by ~.", "원자재 비용이 ~ 올랐습니다.", "gone up"],
    ["We've absorbed the increase until now.", "지금까지는 인상분을 저희가 감당해 왔습니다.", "absorbed"],
    ["We'll have to raise our prices by 7%.", "가격을 7% 인상해야 할 것 같습니다.", "raise"],
    ["The new prices will take effect from ~.", "새 가격은 ~부터 적용됩니다.", "take effect"],
    ["Orders placed before then will keep the current price.", "그 전에 주시는 주문은 현재 가격으로 해드립니다.", "current price"]
  ],
  a:[
    "Hello, I have some news. Our costs went up. We have to raise our prices by 7 percent. The new prices start next month.",
    "Hello, I'm calling to let you know about our prices. The cost of raw materials and shipping has gone up a lot. So we have to raise our prices by 7 percent. The new prices will start from next month. If you order before then, you can still get the current price.",
    "Hi, I'm calling to let you know about a change in our pricing. Over the past six months, raw material costs have gone up by about 15 percent, and freight costs have also increased. We've absorbed the increase until now, but unfortunately, we'll have to raise our prices by 7 percent. The new prices will take effect from March 1st. However, any orders placed before then will keep the current price. I'll send you the updated price list by email today.",
    "Hi, thanks for taking my call. I wanted to let you know personally about a change in our pricing, rather than have you find out from a new price list. As you may have seen, raw material costs have gone up by around 15 percent over the past six months, and ocean freight rates have risen as well. We've absorbed those increases for as long as we could, but we've reached the point where we'll need to raise our prices by 7 percent. The new prices will take effect from March 1st, and any orders confirmed before then will stay at the current price. If it would help, we can also look at lowering costs on your side, for example by consolidating shipments.",
    "Hi, thanks for making time for this. I wanted to speak with you directly, because this concerns our pricing, and I'd rather explain the reasons in person than send a new price list without context. Over the past six months, the cost of our main raw materials has gone up by roughly 15 percent, and ocean freight has increased as well. We've absorbed those costs for two quarters to protect our partners, but it's no longer sustainable without affecting quality, which neither of us wants. So we'll need to raise our prices by 7 percent, effective March 1st. To soften the impact, we're offering a few options. First, any orders confirmed before March 1st will keep the current price. Second, if you place a larger consolidated order, we can hold the old price on that volume. And third, I'd be happy to review your product mix with you to find models where we can reduce costs. I'll send the details in writing today, but I wanted you to hear it from me first."
  ],
  t:[
    "“We have to raise our prices”와 적용 시점만 정확히 말하세요.",
    "인상 이유를 한 문장으로 먼저 말하면 거부감이 줄어요.",
    "“지금까지 감당해 왔다(absorbed)”는 표현이 바이어의 이해를 끌어냅니다.",
    "통보하기보다 직접 알려드리고 싶었다는 태도가 관계를 지킵니다.",
    "인상 통보와 함께 충격을 줄이는 선택지 세 가지를 구조적으로 제시하세요."
  ]
},

/* ---------------- 계약·주문 ---------------- */
{ id:'order', stage:'order', imp:3, title:'주문 확정·결제 조건', en:'Confirming an Order',
  sit:'바이어가 주문을 결정했습니다. 주문 내용을 확인하고 결제 조건을 협의하세요.',
  q:"The buyer is ready to place an order. Please confirm the order details and discuss the payment terms.",
  exp:[
    ["Let me confirm the order details.", "주문 내용을 확인하겠습니다.", "confirm"],
    ["The price is 12 dollars per unit, FOB Busan.", "단가는 개당 12달러, 부산항 본선인도(FOB) 조건입니다.", "FOB"],
    ["We require a 30% deposit by T/T.", "전신송금(T/T)으로 30% 선금을 요청드립니다.", "deposit"],
    ["The balance is due before shipment.", "잔금은 선적 전에 지불하셔야 합니다.", "balance"],
    ["We can also accept an L/C at sight.", "일람불 신용장도 받을 수 있습니다.", "L/C"],
    ["I'll send you a proforma invoice today.", "오늘 견적송장(P/I)을 보내드리겠습니다.", "proforma invoice"]
  ],
  a:[
    "Thank you for your order. You want 2,000 units of the {item}. The price is 12 dollars each. I will send you a proforma invoice.",
    "Thank you for your order. Let me check. You want 2,000 units of the {item}. The price is 12 dollars each, FOB Busan. Please pay a 30 percent deposit first and the balance before shipping. I will send you a proforma invoice today.",
    "Thank you for placing the order. Let me confirm the details: 2,000 units of the {item}, at 12 dollars per unit, FOB Busan. For payment, we require a 30 percent deposit by T/T, and the balance before shipment. Alternatively, we can accept an L/C at sight if that's easier for you. I'll send you a proforma invoice by the end of today, so please review it and let me know if anything needs to be changed.",
    "Great, we're really glad to be working with you. Just to make sure we're on the same page, the order is 2,000 units of the {item}, at 12 dollars a unit, FOB Busan, with shipment scheduled for the first week of December. On payment, our standard terms are a 30 percent deposit by T/T, with the balance due before shipment. I know some first-time partners feel more comfortable with an L/C at sight, and we're open to that as well, though the bank charges would be on your side. Once you let me know which option you prefer, I'll issue the proforma invoice right away.",
    "Wonderful, thank you for your confidence in us. We're excited to get this started. Let me confirm the order details so there's no ambiguity on either side. We have 2,000 units of the {item}, at 12 dollars per unit, FOB Busan, with shipment targeted for the first week of December. For payment, our standard terms are a 30 percent deposit by T/T upon confirmation, with the balance due before shipment. I recognize that, since this is our first transaction together, you may prefer the security of an L/C at sight, and we're comfortable with that as well. The only considerations are that the issuing bank's charges would be on your side, and the L/C would need to reach us at least three weeks before the shipment date to avoid delays. Once you let me know which option you prefer, I'll issue the proforma invoice the same day, along with a production timeline so you can track each milestone."
  ],
  t:[
    "“You want ~”으로 주문 내용을 다시 말해 확인하세요.",
    "수량·단가·조건(FOB)·결제를 순서대로 말하면 실수가 줄어듭니다.",
    "“Alternatively,”로 두 번째 선택지를 제시해 보세요.",
    "“on the same page”로 확인하고, 수수료 부담 같은 세부 조건까지 짚으면 신뢰를 줍니다.",
    "이행 조건(L/C 도착 기한, 수수료 부담)까지 미리 짚어 분쟁을 예방하세요."
  ]
},

{ id:'change', stage:'order', imp:2, title:'주문 변경·취소 요청 대응', en:'Handling an Order Change',
  sit:'생산이 시작된 뒤 바이어가 수량을 줄이고 사양 일부를 바꾸고 싶다고 요청합니다.',
  q:"After production has started, the buyer asks to reduce the order quantity and change one of the specifications. How do you respond?",
  exp:[
    ["Let me check with our production team.", "생산팀에 확인해 보겠습니다.", "production team"],
    ["Production has already started.", "생산이 이미 시작되었습니다.", "already started"],
    ["Materials for the full order have already been purchased.", "전체 주문분의 자재는 이미 구매했습니다.", "already been purchased"],
    ["We can accommodate the change, but ~.", "변경은 가능하지만 ~.", "accommodate"],
    ["There will be an additional charge for ~.", "~에 대한 추가 비용이 발생합니다.", "additional charge"],
    ["Could you confirm the change in writing?", "변경 사항을 서면으로 확인해 주시겠어요?", "in writing"]
  ],
  a:[
    "I see. Production has already started. Let me check with our production team. I will call you back today.",
    "I understand. But production has already started. Let me check with our production team. We can change the specification, but it may cost more. We cannot reduce the quantity very much. I will call you back this afternoon.",
    "Thank you for letting us know. Production started last week, so let me check with our production team first. From what I know, we can accommodate the specification change for the remaining units. However, materials for the full order have already been purchased, so reducing the quantity is difficult. There may also be an additional charge for the change. Could you confirm the change in writing? Then I'll send you the revised schedule and cost.",
    "Thanks for letting us know as early as possible. That really helps. Since production started last week, I've checked with our production team, and here's where we stand. We can accommodate the specification change for about 60 percent of the order that hasn't been processed yet, though it would add roughly a week to the schedule. Reducing the quantity is more difficult, because materials for the full order have already been purchased. What we could do is keep the remaining units in stock and ship them with your next order, instead of cancelling them. There would be a small additional charge for the change itself. Once you confirm in writing which option you'd like, I'll send you a revised schedule and proforma invoice.",
    "Thank you for flagging this now rather than later. It gives us much more room to find a solution. I've already spoken with our production team, so let me lay out the situation and a few options. About 40 percent of the order has already been produced, so the specification change can only apply to the remaining 60 percent. That's doable, but it would push the schedule back by about a week. On the quantity, materials for the full order have already been purchased, so a straight reduction would leave us with stock we can't use. Instead, I'd suggest one of two approaches. We could hold the extra units in our warehouse for up to three months and ship them with your next order at no storage cost. Alternatively, we could reduce the quantity, and you would cover only the material cost of the cancelled units, which is about 30 percent of the unit price. Could you discuss this with your team and confirm your choice in writing? I'll update the schedule and invoice as soon as I hear back."
  ],
  t:[
    "바로 답하지 말고 확인 후 연락드리겠다고 말하는 것도 좋은 대응이에요.",
    "가능한 것(사양 변경)과 어려운 것(수량 감소)을 나눠서 말해 보세요.",
    "변경 사항은 반드시 서면(in writing)으로 확인을 요청하세요. 분쟁을 막아줍니다.",
    "취소 대신 다음 주문으로 이월하는 것처럼 손해를 줄이는 대안을 제시하세요.",
    "현재 상황을 수치로 정리한 뒤 두 가지 선택지와 비용을 명확히 제시하세요."
  ]
},

{ id:'contract', stage:'order', imp:2, title:'계약 조건 협의', en:'Negotiating Contract Terms',
  sit:'1년 장기 공급 계약을 앞두고 인코텀즈, 품질보증, 결제 조건을 협의합니다.',
  q:"You are negotiating a one-year supply contract with a buyer. Discuss key terms such as Incoterms, warranty, and payment.",
  exp:[
    ["Let's go over the key terms.", "주요 조건을 검토해 보죠.", "key terms"],
    ["We'd prefer to ship on FOB terms.", "FOB 조건으로 선적하길 원합니다.", "FOB"],
    ["We offer a one-year warranty against manufacturing defects.", "제조 결함에 대해 1년 품질보증을 제공합니다.", "warranty"],
    ["The balance would be due 30 days after the B/L date.", "잔금은 선하증권(B/L) 발행일 후 30일에 지급됩니다.", "B/L"],
    ["We'd like to include a clause on ~.", "~에 관한 조항을 넣고 싶습니다.", "clause"],
    ["Is that acceptable to you?", "그 조건 괜찮으신가요?", "acceptable"]
  ],
  a:[
    "Let's talk about the contract. We want FOB terms. We give a one-year warranty. Is that okay?",
    "Let's go over the key terms of the contract. We'd like to ship on FOB terms from Busan. We give a one-year warranty for manufacturing defects. For payment, we'd like 30 percent before production and 70 percent before shipment. Is that acceptable to you?",
    "Thank you for sending the draft contract. Let's go over the key terms. First, we'd prefer to ship on FOB terms, because you already have a good forwarder in Korea. Second, we offer a one-year warranty against manufacturing defects. Third, for payment, we'd like a 30 percent deposit and the balance 30 days after the B/L date. We'd also like to include a clause on price adjustments if raw material costs rise sharply. Is that acceptable to you?",
    "Thanks for sending over the draft. Overall, it looks good, but there are a few key terms I'd like to go over. On Incoterms, we'd prefer FOB Busan rather than CIF, since you already work with a reliable forwarder and can likely get better freight rates than we can. On warranty, we're comfortable offering one year against manufacturing defects, though we'd want to exclude damage caused by improper use or storage. On payment, since this is a one-year commitment, we can move from full payment before shipment to a 30 percent deposit, with the balance due 30 days after the B/L date. Finally, we'd like to include a clause allowing a price review if raw material costs move by more than 10 percent. Does that seem reasonable to you?",
    "Thank you for the draft contract. I've gone through it with our team, and overall I think we're closely aligned, so let me focus on the four terms that still need discussion. First, Incoterms. We'd suggest FOB Busan rather than CIF. You already have a strong forwarder relationship, and in our experience, that usually gives the buyer better freight rates and more control over the schedule. Second, the warranty. We're happy to offer one year against manufacturing defects, with a clear exclusion for misuse or improper storage, so that there's no ambiguity if a claim arises. Third, payment. Given that this is a one-year commitment, we're willing to move to a 30 percent deposit with the balance due 30 days after the B/L date, which should help your cash flow. And finally, we'd like to add a price review clause, triggered only if raw material costs move by more than 10 percent in either direction. That protects both of us, not just our side. If these points are acceptable to you, I'll have our legal team send a revised draft by Friday."
  ],
  t:[
    "FOB, warranty(품질보증) 같은 핵심 용어를 정확히 발음하는 것부터 시작하세요.",
    "조건을 하나씩 말하고 “Is that acceptable to you?”로 확인하세요.",
    "First, Second, Third로 조건을 나누면 계약 이야기가 훨씬 명확해집니다.",
    "각 조건마다 이유와 예외 사항(exclusion)을 함께 말해 보세요.",
    "양쪽 모두에게 이익인 조건(in either direction)이라는 점을 강조하면 합의가 쉬워집니다."
  ]
}

);
