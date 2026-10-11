// 상황 데이터 2/2: 생산·선적 · 결제 · 사후 관리 · 공통 (형식은 scenarios-1.js 참고)
(window.SCENARIOS = window.SCENARIOS || []).push(

/* ---------------- 생산·선적 ---------------- */
{ id:'progress', stage:'ship', imp:2, title:'생산 진행 상황 보고', en:'Giving a Production Update',
  sit:'바이어가 주문 생산 진행 상황을 묻습니다. 현재 진척도와 선적 예정일을 보고하세요.',
  q:"The buyer asks for an update on the production of their order. Report the current status and the expected shipping date.",
  exp:[
    ["I'd like to give you an update on ~.", "~ 진행 상황을 알려드리겠습니다.", "update"],
    ["Production is about 70% complete.", "생산이 약 70% 완료되었습니다.", "complete"],
    ["Everything is on schedule.", "모든 것이 일정대로 진행 중입니다.", "on schedule"],
    ["We'll start packing next week.", "다음 주에 포장을 시작합니다.", "packing"],
    ["We've booked space on a vessel leaving on ~.", "~ 출항하는 선박에 선적 공간을 예약했습니다.", "booked"],
    ["I'll send you photos of the finished goods.", "완제품 사진을 보내드리겠습니다.", "photos"]
  ],
  a:[
    "Production is 70 percent complete. Everything is on schedule. We will ship on May 20th.",
    "Hello, I'd like to give you an update on your order. Production is about 70 percent complete. Everything is on schedule. We will start packing next week, and the shipping date is May 20th. I will send you some photos of the products.",
    "Hi, I'd like to give you an update on your order of the {item}. Production is about 70 percent complete, and everything is on schedule. The remaining units will be finished by the end of next week, and then we'll start packing. We've already booked space on a vessel leaving Busan on May 20th. I'll send you photos of the finished goods and the packing tomorrow, so you can check them before shipment.",
    "Hi, I wanted to give you a quick update on your order of the {item}. We're in good shape. Production is about 70 percent complete, and we're on schedule to finish the remaining units by the end of next week. Our QC team has inspected the first batches, and the defect rate so far is well under our target. We've also booked space on a vessel leaving Busan on May 20th, which should arrive at your port around June 15th. Tomorrow, I'll send you photos of the finished goods and the export cartons. If you'd like to arrange a third-party inspection before shipment, now would be a good time to schedule it.",
    "Hi, I wanted to give you a full update on your order of the {item}, including a couple of points that may help your planning. Overall, we're on track. Production is about 70 percent complete, and the remaining units will be finished by the end of next week. Our QC team has inspected the first three batches, and the defect rate is currently below 0.3 percent, which is better than our usual target. On logistics, we've booked space on a vessel leaving Busan on May 20th, with an estimated arrival at your port around June 15th. One thing to flag is that freight rates have been rising on that route, so I'd recommend we keep this booking rather than wait for a later vessel. I'll send you photos of the finished goods and packing tomorrow. If you're planning a third-party inspection, the ideal window would be May 14th to 16th, after packing is complete but before loading. Shall I coordinate that with your inspector directly?"
  ],
  t:[
    "진척률(70%)과 선적일, 두 숫자만 정확히 전달하세요.",
    "“Everything is on schedule”은 진행 보고에서 가장 많이 쓰는 문장이에요.",
    "사진 송부처럼 바이어가 직접 확인할 수 있는 방법을 제안하세요.",
    "검품(QC) 결과와 도착 예정일까지 말하면 바이어가 계획을 세우기 쉬워요.",
    "운임 상승 같은 리스크를 미리 알리고, 검품 일정까지 주도적으로 제안하세요."
  ]
},

{ id:'delay', stage:'ship', imp:3, title:'선적 지연 안내', en:'Reporting a Shipment Delay',
  sit:'원자재 부족으로 선적이 2주 늦어집니다. 바이어에게 전화로 알려야 합니다.',
  q:"Your shipment will be delayed by two weeks because of a raw material shortage. Call the buyer and explain the situation.",
  exp:[
    ["I'm afraid I have some bad news.", "유감스럽지만 좋지 않은 소식이 있습니다.", "bad news"],
    ["Due to ~, the shipment will be delayed by two weeks.", "~로 인해 선적이 2주 지연될 예정입니다.", "delay"],
    ["We sincerely apologize for the inconvenience.", "불편을 드려 진심으로 사과드립니다.", "apologize"],
    ["The new estimated shipping date is December 15th.", "새로운 예상 선적일은 12월 15일입니다.", "shipping date"],
    ["To make up for it, we'd like to ~.", "보상 차원에서 ~해드리고자 합니다.", "make up for"],
    ["We'll keep you updated.", "진행 상황을 계속 알려드리겠습니다.", "keep you updated"]
  ],
  a:[
    "Hello, this is {first}. I'm sorry, but I have bad news. The shipment will be two weeks late. The new date is December 15th.",
    "Hello, this is {first} from {company}. I'm sorry, but I have some bad news. We don't have enough material, so the shipment will be delayed by two weeks. The new shipping date is December 15th. We are very sorry. We will keep you updated if anything changes.",
    "Hi, this is {first} from {company}. I'm afraid I have some bad news about your order. Due to a shortage of raw materials, the shipment will be delayed by about two weeks. The new estimated shipping date is December 15th. We sincerely apologize for the inconvenience. To make up for it, we'd like to cover part of the shipping cost. We'll keep you updated on the progress every week.",
    "Hi, it's {first} from {company}. I wanted to call you personally rather than send an email, because unfortunately there's been a setback with your order. Our raw material supplier has run into a shortage, and as a result, we're looking at a delay of roughly two weeks. The new estimated shipping date is December 15th. I completely understand this puts you in a tough spot, especially with the holiday season coming up. To minimize the impact, we're prioritizing your order on the production line, and to make up for it, we'd like to cover the cost of upgrading part of the shipment to air freight. I'll keep you updated with a written report every Friday until it ships.",
    "Hi, it's {first} from {company}. Do you have a few minutes? I wanted to speak with you directly rather than send an email, because I have some bad news about your order, and I think you deserve to hear it from me along with our plan. Our raw material supplier has run into a shortage, which means we're facing a delay of approximately two weeks. The new estimated shipping date is December 15th. I'm fully aware of what this means for you, especially heading into the holiday season, and I sincerely apologize for the inconvenience. Here's what we've already put in motion. First, your order will go to the front of the production line as soon as the material arrives. Second, we've lined up an alternative supplier as a backup, in case the shortage drags on. And third, to make up for it, we'd like to cover the cost of flying out your fastest-selling items, so your shelves aren't empty during the peak weeks. I'll keep you updated with a written report every Friday. Is there anything on your end, like a promotion date, that I should be planning around?"
  ],
  t:[
    "I'm sorry로 시작하고, 새 날짜를 꼭 알려주세요.",
    "사과 → 이유 → 새 날짜 → 다시 사과. 이 네 가지면 충분합니다.",
    "보상안(운송비 일부 부담)을 한 가지 넣으면 한 단계 올라갑니다.",
    "상대가 겪을 곤란함(연말 시즌)을 먼저 짚어주는 공감 표현이 이 단계의 포인트입니다.",
    "문제 → 이미 실행한 대책 3가지 → 상대 일정 확인. 계획이 있는 사과가 신뢰를 지킵니다."
  ]
},

{ id:'docs', stage:'ship', imp:2, title:'선적 서류 안내', en:'Explaining Shipping Documents',
  sit:'선적이 끝났습니다. 바이어에게 선적 서류(B/L, 인보이스, 원산지증명서 등)를 안내하세요.',
  q:"The goods have been shipped. Explain to the buyer which shipping documents you will send and when.",
  exp:[
    ["The goods were shipped on ~.", "물품은 ~에 선적되었습니다.", "shipped"],
    ["I'll email you copies of the shipping documents.", "선적 서류 사본을 이메일로 보내드리겠습니다.", "shipping documents"],
    ["This includes the commercial invoice and packing list.", "상업송장과 포장명세서가 포함됩니다.", "packing list"],
    ["The original B/L will be sent by courier.", "B/L 원본은 특송으로 보내드립니다.", "original"],
    ["We've also prepared a certificate of origin.", "원산지증명서도 준비했습니다.", "certificate of origin"],
    ["You may get a reduced tariff under the FTA.", "FTA에 따라 관세 감면을 받으실 수 있습니다.", "FTA"]
  ],
  a:[
    "Your goods were shipped today. I will email you the shipping documents. The original B/L will be sent by courier.",
    "Hello, your goods were shipped today. I will email you copies of the shipping documents. They include the commercial invoice, the packing list, and the B/L. We will send the original B/L by courier. We also have a certificate of origin.",
    "Hi, I'm happy to let you know that your goods were shipped on May 20th. I'll email you copies of the shipping documents today. This includes the commercial invoice, the packing list, and the bill of lading. The original B/L will be sent by courier tomorrow, and it should arrive in three or four days. We've also prepared a certificate of origin, so you may be able to get a reduced tariff under the FTA.",
    "Hi, good news. Your goods were loaded on May 20th as planned, and the vessel is now on its way. I'll email you copies of the full set of shipping documents today, including the commercial invoice, packing list, and bill of lading. Please check them carefully, especially the consignee details and product descriptions, because any mismatch can delay customs clearance on your side. The original B/L will go out by courier tomorrow, and it should reach you well before the vessel arrives. We've also issued a certificate of origin, which should allow you to claim a reduced tariff under the FTA. If your customs broker needs any additional documents, just let me know.",
    "Hi, I'm pleased to confirm that your goods were loaded on May 20th as scheduled, and the vessel is now on its way, with arrival expected around June 15th. Let me go through the documents so your customs clearance goes smoothly. Today, I'll email you scanned copies of the commercial invoice, packing list, and bill of lading. I'd really appreciate it if you or your customs broker could check them within the next two days, particularly the consignee details and HS codes, because it's much easier to correct anything now than once the cargo has arrived. The original B/L will be sent by courier tomorrow, and I'll share the tracking number. Alternatively, if it's more convenient, we can arrange a telex release, so you won't need the originals at all. We've also issued a certificate of origin, which should qualify the shipment for reduced tariffs under the FTA. That alone could save you a meaningful amount on duties."
  ],
  t:[
    "shipping documents, B/L 같은 서류 이름을 정확히 말하는 연습부터 하세요.",
    "보내는 서류를 하나씩 나열해 보세요. invoice, packing list, B/L 순서로요.",
    "원산지증명서와 FTA 관세 혜택을 함께 언급하면 바이어에게 도움이 됩니다.",
    "서류 검토를 요청하는 이유(통관 지연 방지)까지 설명하세요.",
    "서렌더(telex release) 같은 대안과 절감 효과까지 제시하면 전문가다운 안내가 됩니다."
  ]
},

/* ---------------- 결제 ---------------- */
{ id:'payment', stage:'pay', imp:3, title:'대금 독촉', en:'Following Up on an Overdue Payment',
  sit:'결제 기한이 2주 지났는데 잔금 3만 달러가 입금되지 않았습니다.',
  q:"The balance payment of thirty thousand dollars is two weeks overdue. Call the buyer and ask for the payment politely but firmly.",
  exp:[
    ["I'm calling about invoice number ~.", "~번 인보이스 건으로 연락드렸습니다.", "invoice"],
    ["The payment was due on ~.", "결제 기한은 ~이었습니다.", "due"],
    ["We haven't received the payment yet.", "아직 대금을 받지 못했습니다.", "haven't received"],
    ["Could you check on the status of the payment?", "결제 진행 상황을 확인해 주시겠어요?", "status"],
    ["When can we expect the payment?", "언제쯤 입금될까요?", "expect"],
    ["If there's an issue, please let us know.", "문제가 있다면 알려주세요.", "issue"]
  ],
  a:[
    "Hello, I'm calling about the payment. It was due two weeks ago. We haven't received it yet. When can you pay?",
    "Hello, this is {first} from {company}. I'm calling about invoice number 2051. The payment was due on May 1st, but we haven't received it yet. Could you check on it for me? When can we expect the payment?",
    "Hi, this is {first} from {company}. I'm calling about invoice number 2051 for 30,000 dollars. The payment was due on May 1st, but we haven't received it yet. It may be a simple delay at the bank, but could you check on the status of the payment? If there's an issue, please let us know. When can we expect the payment?",
    "Hi, this is {first} from {company}. I hope you're doing well. I'm calling about invoice number 2051 for 30,000 dollars, which was due on May 1st. According to our records, we haven't received the payment yet. I'm sure it's just an oversight or a delay on the banking side, but could you check on the status for me? If the transfer has already been made, a copy of the remittance slip would help us trace it. And if there's any issue on your end, please let us know, so we can work it out together. Could you give me a date when we can expect the payment?",
    "Hi, this is {first} from {company}. Thanks for taking my call. I'm calling about invoice number 2051 for 30,000 dollars, which was due on May 1st. As of this morning, we haven't received the payment, so I wanted to check in with you directly. I'm sure there's a good explanation, and if the transfer is already in process, a copy of the remittance slip would let us trace it with our bank. If there's something else going on, such as a cash flow issue or a question about the shipment, I'd much rather hear about it now so we can find a solution together. That said, I do need to be clear about one thing. Under our terms, we're unable to release your next order until the outstanding balance is settled, and I don't want that to affect your stock levels. Could we agree on a firm payment date today? If it would help, we could also discuss splitting the amount into two transfers."
  ],
  t:[
    "기한이 지났다는 사실과 “When can you pay?” 한 문장이면 됩니다.",
    "인보이스 번호와 기한을 정확히 말해야 상대가 바로 확인할 수 있어요.",
    "단순 지연일 수 있다고 여지를 주면 정중하면서도 분명해집니다.",
    "송금증(remittance slip)을 요청하면 실제로 보냈는지 확인할 수 있어요.",
    "공감 → 분명한 결과(다음 주문 보류) → 구체적 날짜 합의. 정중하지만 단호한 구조입니다."
  ]
},

{ id:'lc', stage:'pay', imp:2, title:'신용장 하자·수정 요청', en:'Requesting an L/C Amendment',
  sit:'받은 신용장 조건이 계약과 달라 수정(amendment)을 요청해야 합니다.',
  q:"You received the buyer's letter of credit, but some terms don't match the contract. Ask the buyer to amend the L/C.",
  exp:[
    ["We've received the L/C, thank you.", "신용장 잘 받았습니다.", "received"],
    ["Some terms don't match the contract.", "일부 조건이 계약과 다릅니다.", "match"],
    ["The latest shipment date is too early.", "최종 선적일이 너무 이릅니다.", "latest shipment date"],
    ["Could you ask your bank to amend the L/C?", "은행에 신용장 수정을 요청해 주시겠어요?", "amend"],
    ["Partial shipments should be allowed.", "분할 선적이 허용되어야 합니다.", "partial shipment"],
    ["Otherwise, there may be a discrepancy.", "그렇지 않으면 하자가 생길 수 있습니다.", "discrepan"]
  ],
  a:[
    "We received the L/C. But some terms are different from the contract. Could you change the L/C, please?",
    "Thank you for opening the L/C. We checked it, but some terms don't match the contract. The latest shipment date is May 15th, but in the contract it is May 30th. Could you ask your bank to amend the L/C? Thank you.",
    "Thank you for opening the L/C. We've checked it carefully, and there are two terms that don't match our contract. First, the latest shipment date is May 15th, but the contract says May 30th. Second, partial shipments are not allowed, but we agreed to ship in two lots. Could you ask your bank to amend the L/C? Otherwise, there may be a discrepancy, and the payment could be delayed.",
    "Thanks for arranging the L/C so quickly. We've gone through it with our bank, and there are two points that don't match the contract, so we'd like to ask for an amendment. First, the latest shipment date is listed as May 15th, whereas the contract specifies May 30th. Given our production schedule, we wouldn't be able to meet the earlier date. Second, the L/C prohibits partial shipments, but we agreed to ship in two lots. If we ship under the current terms, the documents would show a discrepancy, and that could delay payment or lead to extra bank fees for both of us. Could you ask your bank to amend these two points? Once we receive the amendment, we'll confirm the shipping schedule right away.",
    "Thank you for opening the L/C so promptly. We've reviewed it line by line with our bank, and I'd like to raise two points now, because it's far easier to fix them at this stage than after shipment. First, the latest shipment date is May 15th, while the contract specifies May 30th. With our current production schedule, the earlier date simply isn't achievable. Second, the L/C prohibits partial shipments, but we agreed to ship in two lots so you could receive the first half earlier. If we proceed under the current wording, our documents would almost certainly be found discrepant, which could hold up payment and trigger discrepancy fees on both sides. So could you ask your issuing bank to amend these two points? To save time, I'll email you the exact wording we'd suggest for each clause. Also, since amendments can take a few days, it would help if we could receive it by the end of next week, so our first lot stays on schedule."
  ],
  t:[
    "“Could you change the L/C?”로 수정 요청을 간단히 말해 보세요.",
    "계약 내용과 신용장 내용을 나란히 비교해서 말하세요.",
    "수정하지 않으면 생길 문제(discrepancy, 결제 지연)를 꼭 알려주세요.",
    "양쪽 모두의 손해(은행 수수료)를 강조하면 협조를 얻기 쉬워요.",
    "수정 문구까지 직접 제안하고 기한을 정하면 처리 속도가 빨라집니다."
  ]
},

{ id:'terms', stage:'pay', imp:1, title:'결제 조건 변경 요청', en:'Changing Payment Terms',
  sit:'2년간 거래한 바이어가 선금 없이 선적 후 60일 결제(외상)로 바꾸고 싶다고 요청합니다.',
  q:"A buyer you've worked with for two years asks to change the payment terms from a deposit to sixty days after shipment. How do you respond?",
  exp:[
    ["We appreciate our long relationship.", "오랜 거래 관계에 감사드립니다.", "relationship"],
    ["I'll need to discuss this with our finance team.", "재무팀과 상의해야 합니다.", "finance team"],
    ["We could offer 30 days instead of 60.", "60일 대신 30일은 가능합니다.", "instead of"],
    ["We'd need credit insurance for that.", "그러려면 신용보험이 필요합니다.", "insurance"],
    ["How about we start with ~ and review it later?", "~으로 시작하고 나중에 다시 검토하면 어떨까요?", "review"]
  ],
  a:[
    "Thank you for asking. 60 days is difficult for us. How about 30 days? I will talk to our finance team.",
    "Thank you for your request. We really appreciate our relationship. But 60 days is a little long for us. I need to discuss this with our finance team. Maybe we can offer 30 days instead of 60. I will let you know this week.",
    "Thank you for asking, and we really appreciate our long relationship. I understand that payment after shipment would help your cash flow. However, 60 days is a big change for us, so I'll need to discuss it with our finance team. One option could be 30 days after shipment instead of 60, without a deposit. How about we start with that and review it again in six months?",
    "Thanks for raising this. Honestly, after two years of working together and always being paid on time, it's a fair request. I understand that open account terms would make a real difference to your cash flow. That said, moving straight from a deposit to 60 days is a significant change on our side, so I'll need to run it by our finance team. To be transparent, I think 30 days after shipment would be much easier to approve. We'd also need to put credit insurance in place, which is standard for us. How about we start with 30 days for the next two orders, and review it together after that?",
    "Thank you for bringing this up. After two years of working together, with every payment made on time, I think it's a very reasonable request, and I'd like to find a way to make it work. Let me be transparent about our side, though. Moving from a 30 percent deposit to 60 days after shipment would roughly double the amount we have outstanding with you at any one time, so it needs approval from our finance team and our credit insurer. What I'd like to propose is a step-by-step approach. For the next two orders, we could move to 30 days after shipment, with no deposit. Assuming everything goes smoothly, we'd then extend that to 60 days from the third quarter. In the meantime, I'll start the credit insurance application, which usually takes about two weeks. Would that kind of phased transition work for you? I'll confirm the details in writing once our finance team signs off."
  ],
  t:[
    "어렵다고만 하지 말고 30일 같은 대안을 함께 말하세요.",
    "“I need to discuss this with ~”로 즉답을 피하는 방법을 익히세요.",
    "상대의 사정(현금 흐름)을 이해한다고 먼저 말해 보세요.",
    "신용보험처럼 조건을 바꾸는 데 필요한 장치를 함께 언급하세요.",
    "단계적 전환안을 제시하면 관계를 지키면서도 위험을 관리할 수 있어요."
  ]
},

/* ---------------- 사후 관리 ---------------- */
{ id:'claim', stage:'after', imp:3, title:'클레임 대응', en:'Handling a Complaint',
  sit:'바이어가 받은 제품의 10%가 파손되었다고 항의합니다.',
  q:"The buyer complains that ten percent of the products they received were damaged. How would you handle this complaint?",
  exp:[
    ["I'm very sorry to hear that.", "그런 일이 있었다니 정말 죄송합니다.", "sorry"],
    ["Could you send us some photos of the damaged items?", "파손된 제품 사진을 보내주시겠어요?", "photos"],
    ["We'll look into it right away.", "바로 확인해 보겠습니다.", "look into"],
    ["We'll send replacements at no extra cost.", "추가 비용 없이 교체품을 보내드리겠습니다.", "replacement"],
    ["We can give you a credit on your next order.", "다음 주문 시 차감해 드릴 수 있습니다.", "credit"],
    ["We'll make sure this doesn't happen again.", "재발하지 않도록 하겠습니다.", "happen again"]
  ],
  a:[
    "I'm very sorry. Please send me some photos. We will send you new products.",
    "I'm very sorry to hear that. Can you send me some photos of the broken products? We will look into the problem quickly. We will send you replacements for free. We will be more careful, so it won't happen again.",
    "I'm very sorry to hear that some of the products arrived damaged. Could you please send us some photos of the damaged items and the packaging? We'll look into it right away and find out whether it happened during packing or shipping. Either way, we'll send replacements at no extra cost, or if you prefer, we can give you a credit on your next order. We'll also improve our packaging to make sure this doesn't happen again.",
    "First of all, I'm really sorry. That's not the experience we want any of our partners to have. Could you send over photos of the damaged items, along with the outer cartons? That'll help us figure out whether the issue occurred at our end or in transit, and if it's the latter, we'll file the insurance claim ourselves so you don't have to deal with it. In the meantime, I don't want this to hold up your sales, so we'll ship replacements by air at our expense, regardless of where the fault lies. Going forward, we're also switching to reinforced packaging for all your shipments.",
    "Thank you for letting us know so quickly, and I'm truly sorry. I know damaged goods create problems well beyond the cost of the units themselves, so let me walk you through how we'll handle this. To start, could you send us photos of the damaged items and the outer cartons, along with the delivery receipt if the carrier made any notes? That will help us pinpoint whether it happened during packing or in transit. We'll look into it right away, and if it turns out to be transit damage, we'll file the insurance claim on your behalf. Regardless of the outcome, we'll ship replacements by air at no extra cost this week, so your sales aren't affected. Alternatively, if you'd prefer, we can apply a credit to your next order instead. Longer term, we've already started a packaging review, and we'll share the results with you, including a drop-test report, to make sure this doesn't happen again. I'll follow up by email today with everything in writing."
  ],
  t:[
    "사과 → 사진 요청 → 교체. 세 문장이면 충분합니다.",
    "사과 → 증거 요청(사진) → 해결책. 순서를 지키세요.",
    "선택지(교체 또는 다음 주문 차감)를 주면 상대가 통제감을 느낍니다.",
    "상대의 번거로움을 대신 떠안는 제안(보험 청구 대행)이 고급 대응입니다.",
    "해결책을 단기(교체)와 장기(포장 개선)로 나누고, 서면 확인까지 약속하세요."
  ]
},

{ id:'quality', stage:'after', imp:2, title:'품질 문제 원인 설명', en:'Explaining a Quality Issue',
  sit:'클레임 조사 결과가 나왔습니다. 바이어에게 원인과 재발 방지 대책을 설명하세요.',
  q:"You have finished investigating a quality problem the buyer reported. Explain the cause and what you will do to prevent it from happening again.",
  exp:[
    ["We've completed our investigation.", "조사를 마쳤습니다.", "investigation"],
    ["The problem was caused by ~.", "문제의 원인은 ~이었습니다.", "caused by"],
    ["We take full responsibility.", "전적으로 책임지겠습니다.", "responsibility"],
    ["We've taken corrective action.", "시정 조치를 취했습니다.", "corrective action"],
    ["We've added an extra inspection step.", "검사 단계를 하나 추가했습니다.", "inspection"],
    ["We'll send you a full report.", "전체 보고서를 보내드리겠습니다.", "report"]
  ],
  a:[
    "We checked the problem. A machine was not working well. We fixed it. We are very sorry.",
    "We've finished checking the problem. It was caused by a machine setting in our factory. We are sorry, and we take responsibility. We fixed the machine, and we added one more inspection. We will send you a report.",
    "Thank you for waiting. We've completed our investigation into the problem with the {item}. The problem was caused by an incorrect machine setting during one production shift. We take full responsibility for this. We've already fixed the setting, and we've added an extra inspection step for that part. We'll send you a full report with photos by Friday.",
    "Thank you for your patience while we looked into this. We've completed our investigation, and I'd like to walk you through what we found. The problem was caused by an incorrect machine setting during a single night shift, which affected about 300 units of the {item}. It wasn't caught because our inspection at that stage was based on sampling. We take full responsibility for that. As corrective action, we've recalibrated the machine, retrained the operators on that line, and added a full inspection step for that part, not just sampling. I'll send you a full report by Friday, including photos and the test data, and of course, the replacement units are already on their way.",
    "Thank you for your patience while we investigated. I want to share what we found openly, including where our own process fell short. The root cause was an incorrect machine setting during one night shift, which affected about 300 units of the {item}. Those units got through because, at that stage, we were inspecting by sampling rather than checking every unit. So the issue wasn't only the setting, but also a gap in our inspection system, and we take full responsibility for both. We've taken corrective action on three levels. Immediately, the machine was recalibrated and the operators were retrained. In the process itself, we've changed that step from sampling to a full inspection, and we've added an automatic alert if the setting drifts. And to verify it's working, we'll share inspection data with you for your next three orders. A full report with photos and test results will reach you by Friday. If you'd find it useful, I'd also welcome you or a third party to audit the line."
  ],
  t:[
    "원인 → 해결 → 사과. 짧은 세 문장으로 시작하세요.",
    "“It was caused by ~”는 원인 설명의 기본 패턴이에요.",
    "“We take full responsibility”로 책임을 분명히 하면 신뢰가 회복됩니다.",
    "왜 발견하지 못했는지까지 설명하면 진정성이 커집니다.",
    "대책을 즉시·공정·검증 세 단계로 나누고, 감사(audit)까지 제안하세요."
  ]
},

{ id:'reorder', stage:'after', imp:2, title:'재주문 유도·관계 유지', en:'Encouraging a Reorder',
  sit:'첫 주문 후 3개월이 지났습니다. 판매 반응을 묻고 재주문을 자연스럽게 제안하세요.',
  q:"It has been three months since the buyer's first order. Call to ask how sales are going and naturally suggest a reorder.",
  exp:[
    ["I just wanted to check in.", "안부 겸 연락드렸습니다.", "check in"],
    ["How are sales going?", "판매는 어떠세요?", "sales"],
    ["Have you received any feedback from customers?", "고객 반응은 어떤가요?", "feedback"],
    ["It might be a good time to reorder.", "재주문하시기 좋은 시점일 것 같습니다.", "reorder"],
    ["We're launching a new model next month.", "다음 달에 신모델을 출시합니다.", "new model"],
    ["Is there anything we could do better?", "저희가 더 개선할 점이 있을까요?", "better"]
  ],
  a:[
    "Hello, I just wanted to check in. How are sales going? Do you need more products? Please let me know.",
    "Hello, this is {first} from {company}. I just wanted to check in. How are sales of the {item} going? Did your customers like it? If you need more stock, it might be a good time to reorder. Our factory is not busy now.",
    "Hi, this is {first} from {company}. It's been about three months since your first order, so I just wanted to check in. How are sales of the {item} going? Have you received any feedback from customers? If your stock is getting low, it might be a good time to reorder, because our production schedule is still open next month. Also, is there anything we could do better for the next order?",
    "Hi, it's {first} from {company}. I hope things are going well. It's been about three months since your first shipment arrived, so I just wanted to check in and see how the {item} has been doing in your market. Have you heard any feedback from your customers, good or bad? That would really help us. The reason I ask is that our production schedule tends to fill up quickly from next month, so if your stock is getting low, now might be a good time to plan your next order. Also, we're launching a new model next month, and I think it could work well alongside your current range. Would you like me to send you the details?",
    "Hi, it's {first} from {company}. I hope business is going well. It's been about three months since your first shipment arrived, so I wanted to check in, not just about a reorder, but to hear how things have actually gone for you. How has the {item} been selling, and what have your customers been saying? Honestly, critical feedback is often the most useful for us. I'm also asking because I'd like to plan ahead with you. Based on your first order size and typical sales, you may be getting close to the point where you'd need to restock, and our production slots fill up quickly from next month. If you could share a rough forecast, we could reserve capacity for you without any commitment. And on a separate note, we're launching a new model next month that addresses a request we've heard from several retailers. I'd be happy to send you an early sample, so you can see whether it fits your range."
  ],
  t:[
    "“How are sales going?” 한 문장으로 자연스럽게 시작하세요.",
    "판매 반응을 먼저 묻고 재주문은 나중에 꺼내는 순서가 중요해요.",
    "생산 일정이 비어 있다는 사실을 재주문의 이유로 제시해 보세요.",
    "고객 피드백을 요청하면 영업 전화가 아닌 파트너 대화가 됩니다.",
    "예측(forecast)을 함께 세우자고 제안하면 재주문이 자연스러운 다음 단계가 됩니다."
  ]
},

{ id:'exclusive', stage:'after', imp:1, title:'독점 판매권 협의', en:'Discussing Exclusive Rights',
  sit:'바이어가 자국 내 독점 판매권을 요구합니다.',
  q:"The buyer asks for exclusive distribution rights for their country. Respond and discuss the conditions.",
  exp:[
    ["We're open to discussing exclusivity.", "독점권 논의에 열려 있습니다.", "exclusiv"],
    ["We'd need a minimum annual purchase commitment.", "연간 최소 구매 약정이 필요합니다.", "minimum"],
    ["How about a one-year trial period?", "1년 시범 기간은 어떨까요?", "trial period"],
    ["The agreement would cover your country only.", "계약 범위는 귀국에 한정됩니다.", "cover"],
    ["If the target is met, we can extend the agreement.", "목표를 달성하면 계약을 연장할 수 있습니다.", "target"]
  ],
  a:[
    "Thank you for your interest. We are open to it. But you need to buy a minimum amount every year. Is that okay?",
    "Thank you for asking about exclusive rights. We're open to discussing it. But we would need a minimum purchase every year, for example 50,000 units. We could start with a one-year trial period. What do you think?",
    "Thank you for your interest in becoming our exclusive distributor. We're open to discussing exclusivity, because it can be good for both of us. However, we'd need a minimum annual purchase commitment of about 50,000 units. How about a one-year trial period first? If the target is met, we can extend the agreement for three more years.",
    "Thank you. It's great to hear that you're confident enough in our products to want exclusivity. We're definitely open to discussing it, but as you can imagine, giving exclusive rights means turning away other potential partners in your country, so we'd need a few conditions in place. First, a minimum annual purchase commitment, which we'd suggest at around 50,000 units. Second, we'd prefer to start with a one-year trial period, and if the target is met, extend it for three years. And third, the agreement would cover your country only, and possibly only certain channels, such as retail. Would you be comfortable with that kind of structure?",
    "Thank you. I take your request as a real sign of confidence in our products, and I'd genuinely like to explore it. Let me explain how we usually think about exclusivity, so we can design something fair for both sides. By granting exclusive rights, we'd be closing the door on every other partner in your country, so our main concern is making sure the market is actively developed. With that in mind, I'd propose three conditions. First, a minimum annual purchase commitment, starting at around 50,000 units, with clear growth targets for the following years. Second, a one-year trial period, after which the agreement would automatically extend for three years if the target is met. If it isn't, the agreement would simply become non-exclusive, rather than ending the partnership altogether. And third, a defined scope, covering your country and the retail and online channels you're already strong in. In return, we'd commit to marketing support and priority production slots. Could you share your sales plan for the first year, so we can set realistic targets together?"
  ],
  t:[
    "열려 있다(open)고 말한 뒤 조건이 있다는 점을 알려주세요.",
    "최소 구매량을 구체적인 숫자로 제시하세요.",
    "시범 기간 후 연장하는 구조를 제안하면 협상이 쉬워져요.",
    "독점권이 우리에게 주는 위험(다른 파트너 포기)을 먼저 설명하세요.",
    "목표 미달 시 비독점으로 전환하는 것처럼 관계를 끊지 않는 출구를 설계해 보세요."
  ]
},

/* ---------------- 공통 ---------------- */
{ id:'schedule', stage:'common', imp:2, title:'화상회의 일정 조율', en:'Scheduling a Call',
  sit:'시차가 있는 런던의 바이어와 화상회의 일정을 잡아야 합니다.',
  q:"You need to schedule a video call with a buyer in London. There is a time difference. Suggest a time and confirm the details.",
  exp:[
    ["Would you be available for a quick call this week?", "이번 주에 잠깐 통화 가능하실까요?", "available"],
    ["How does Thursday at 9 a.m. your time sound?", "그쪽 시간으로 목요일 오전 9시 어떠세요?", "your time"],
    ["There's a nine-hour time difference.", "9시간 시차가 있습니다.", "time difference"],
    ["I'll send you a calendar invite with the link.", "링크와 함께 일정 초대를 보내드리겠습니다.", "invite"],
    ["Could we push it back to Friday?", "금요일로 미룰 수 있을까요?", "push it back"]
  ],
  a:[
    "Hello Mark. Are you available on Thursday? How about 9 a.m. your time? I will send you the link.",
    "Hello Mark, can we have a video call this week? Is 9 a.m. on Thursday okay for you? In Korea, it is 6 p.m. That is fine for me. I will send you the meeting link by email.",
    "Hi Mark, would you be available for a quick video call this week to go over the samples? Since there's a nine-hour time difference, how about Thursday at 9 a.m. your time? That would be 6 p.m. here in Seoul, so it works well for both of us. If that doesn't suit you, Friday morning is also fine. Once you confirm, I'll send you a calendar invite with the Zoom link.",
    "Hi Mark, I hope your week's going well. I was wondering if we could set up a short video call to walk through the sample feedback before we finalize the specs. I've double-checked the time difference, and we're nine hours ahead, so how does Thursday at 9 a.m. your time sound? That'd be 6 p.m. on my end, which is no trouble at all. If your morning's already packed, I'm happy to work around your schedule. Just give me a couple of windows that suit you. Once we've locked it in, I'll send over a calendar invite with the link and a brief agenda.",
    "Hi Mark, I hope your week is going well. Following up on the sample feedback you sent, I think a short video call before we finalize the specs would be productive, since we could resolve the remaining questions in one go rather than over several emails. Would you be available on Thursday? I've checked the time difference, and since we're nine hours ahead, how does 9 a.m. your time sound? That would be 6 p.m. in Seoul, which works perfectly on my end. If mornings are busy for you, I'm happy to work around your schedule, so just let me know two or three windows that suit you. I'd suggest we keep it to about thirty minutes, and I'll bring in our production manager so we can answer any technical questions on the spot. Once we've locked in a time, I'll send a calendar invite with the link and a short agenda. And if anything comes up, we can always push it back."
  ],
  t:[
    "요일과 시간을 “How about ~?”으로 제안해 보세요.",
    "요일·시간·도구(링크)만 정확하면 됩니다. 숫자 발음에 신경 쓰세요.",
    "“If that doesn't suit you,”로 대체 일정을 함께 제시해 보세요.",
    "회의 목적(샘플 피드백)과 안건(agenda)까지 언급하면 프로다운 인상을 줍니다.",
    "목적·시간·참석자·안건을 한 번에 제안하면 상대가 바로 결정할 수 있습니다."
  ]
},

{ id:'meeting', stage:'common', imp:2, title:'회의 진행·요약', en:'Wrapping Up a Meeting',
  sit:'바이어와의 화상회의를 마무리하면서 논의 내용을 요약하고 다음 단계를 정리하세요.',
  q:"You are wrapping up a video meeting with a buyer. Summarize what was agreed and confirm the next steps.",
  exp:[
    ["Let me summarize what we discussed.", "논의한 내용을 정리하겠습니다.", "summarize"],
    ["We agreed on ~.", "~에 합의했습니다.", "agreed"],
    ["As for the next steps, ~.", "다음 단계로는 ~.", "next steps"],
    ["I'll send you the meeting notes.", "회의록을 보내드리겠습니다.", "meeting notes"],
    ["Did I miss anything?", "빠뜨린 게 있을까요?", "miss anything"],
    ["Thank you for your time today.", "오늘 시간 내주셔서 감사합니다.", "your time"]
  ],
  a:[
    "Let me summarize. We agreed on the price. I will send you the samples. Thank you for your time today.",
    "Okay, let me summarize what we discussed. We agreed on the price of 12 dollars. We will send you two samples next week. You will check them and give us feedback. I'll send you the meeting notes today. Thank you for your time.",
    "We're almost out of time, so let me summarize what we discussed. First, we agreed on a unit price of 12 dollars for 2,000 units. Second, we'll send you two new samples of the {item} by next Friday. As for the next steps, you'll test the samples and send us your feedback by the end of the month. I'll send you the meeting notes today. Did I miss anything? Thank you for your time today.",
    "I'm conscious of the time, so let me quickly summarize what we've covered, to make sure we're on the same page. On pricing, we agreed on 12 dollars per unit for the first 2,000 units. On the product, we'll adjust the packaging design based on your comments and send two new samples by next Friday. As for the next steps, your team will test the samples and send feedback by the end of the month, and if everything looks good, you'll issue the purchase order in early July. I'll send you the meeting notes this afternoon. Did I miss anything, or is there anything you'd like to add?",
    "We're coming up on the hour, so let me take two minutes to recap, just to make sure we leave with the same understanding. We covered three main points today. First, pricing. We agreed on 12 dollars per unit for the first 2,000 units, with the volume discount we discussed applying from the second order. Second, the product. We'll revise the packaging based on your comments and send two new samples by next Friday. And third, timing. You're aiming to place the order in early July for a September launch, which means we'll need final approval by June 20th to stay on schedule. As for the next steps, I'll send the meeting notes and the revised timeline this afternoon, and your team will test the samples and share feedback by the end of the month. There was one open question on the certification documents, and I'll follow up on that separately by Wednesday. Did I miss anything? If not, thank you so much for your time today. This was a really productive meeting."
  ],
  t:[
    "“Let me summarize”로 시작해 합의한 것 하나만 말해도 충분해요.",
    "합의 사항과 할 일을 We / You로 나눠 말해 보세요.",
    "First, Second로 정리하고 “Did I miss anything?”으로 확인하세요.",
    "누가·무엇을·언제까지 할지 정리하면 회의가 실행으로 이어집니다.",
    "남은 쟁점(open question)과 역산한 마감일까지 짚으면 회의를 주도할 수 있어요."
  ]
},

{ id:'phone', stage:'common', imp:2, title:'전화 연결·메시지 남기기', en:'Leaving a Phone Message',
  sit:'바이어 회사에 전화했는데 담당자가 자리에 없습니다. 메시지를 남기세요.',
  q:"You call the buyer's office, but the person you need is not available. Ask the receptionist if you can leave a message.",
  exp:[
    ["May I speak to ~, please?", "~와 통화할 수 있을까요?", "speak to"],
    ["Could I leave a message?", "메시지를 남겨도 될까요?", "message"],
    ["Could you ask him to call me back?", "다시 전화 달라고 전해 주시겠어요?", "call me back"],
    ["It's regarding ~.", "~ 건입니다.", "regarding"],
    ["My number is ~.", "제 번호는 ~입니다.", "my number"],
    ["Let me spell my name for you.", "제 이름 철자를 불러드릴게요.", "spell"]
  ],
  a:[
    "Hello, may I speak to Mr. Brown, please? Could I leave a message? Please ask him to call me back. Thank you.",
    "Hello, this is {name} from {company} in Korea. May I speak to Mr. Brown, please? Oh, he's in a meeting. Could I leave a message? Please ask him to call me back. It's about the samples. My number is 82 10 1234 5678. Thank you.",
    "Hi, this is {name} calling from {company} in Korea. May I speak to Mr. Brown, please? I see, he's in a meeting. Could I leave a message? It's regarding the samples we sent last week. Could you ask him to call me back when he's free? My number is plus 82, 10, 1234, 5678. Let me spell my name for you. Thank you so much for your help.",
    "Hi, good morning. This is {name} calling from {company} in Korea. Could I speak to Mr. Brown, please? Ah, I see, he's in a meeting. In that case, would it be possible to leave a message? It's regarding the samples we sent last week, and I'd like to confirm whether they arrived safely. Could you ask him to call me back when he has a moment? My number is plus 82, 10, 1234, 5678. Just so you know, it's evening here in Korea, but he can call until about 10 p.m. my time. Should I spell my name for you? Thanks so much, I really appreciate your help.",
    "Good morning, this is {name} calling from {company} in Korea. Could I speak to Mr. Brown, please? Ah, I see, he's in a meeting. No problem at all. Would you mind taking a short message for him? It's regarding the samples we sent last week. I'd like to confirm that they arrived and see whether he has any initial feedback before our production slot closes on Friday. Could you ask him to call me back when he has a moment? My number is plus 82, 10, 1234, 5678. It's already evening here, but he's welcome to call until 10 p.m. in Korea. If that's inconvenient, I'll also send him a short email, so he can reply whenever it suits him. Let me spell my name for you, just to be sure. Thank you so much, I really appreciate your help."
  ],
  t:[
    "May I speak to ~? / Could I leave a message? 두 문장을 통째로 외우세요.",
    "용건(It's about ~)을 한마디 덧붙이면 메시지가 정확히 전달돼요.",
    "전화번호는 국가번호부터 숫자를 끊어서 천천히 말하세요.",
    "시차를 고려해 통화 가능한 시간을 알려주는 것이 실무 매너입니다.",
    "메시지에 마감(금요일)을 넣고 이메일로도 보내겠다고 하면 놓칠 일이 없어요."
  ]
},

{ id:'smalltalk', stage:'common', imp:2, title:'비즈니스 스몰토크', en:'Business Small Talk',
  sit:'미팅 시작 전, 처음 만난 바이어와 가볍게 대화를 나눕니다.',
  q:"Before a meeting starts, you have a few minutes of small talk with a buyer you're meeting for the first time. Keep the conversation going naturally.",
  exp:[
    ["Did you find the place okay?", "찾아오시는 데 어렵지 않으셨어요?", "find the place"],
    ["Is this your first time in Korea?", "한국은 처음이세요?", "first time"],
    ["How long are you staying?", "얼마나 머무세요?", "how long"],
    ["Have you had a chance to try ~?", "~ 드셔 보셨어요?", "chance to"],
    ["I'd recommend ~.", "~을 추천해요.", "recommend"],
    ["Shall we get started?", "시작할까요?", "get started"]
  ],
  a:[
    "Nice to meet you. Is this your first time in Korea? How long are you staying? Shall we get started?",
    "Nice to meet you. Did you find the place okay? Is this your first time in Korea? How long are you staying? You should try Korean barbecue. It's really good. Okay, shall we get started?",
    "It's so nice to finally meet you. Did you find the place okay? Is this your first time in Korea? Oh, really? How long are you staying? Have you had a chance to try Korean food yet? If not, I'd recommend trying Korean barbecue. There's a great place near your hotel. I can send you the address later. Well, shall we get started?",
    "It's really nice to finally put a face to the name after all our emails. Did you find the place okay? The traffic around here can be a bit crazy. Is this your first time in Korea? Oh, that's great. How long are you staying? If you have a free evening, I'd definitely recommend trying Korean barbecue. There's a place near your hotel that's popular with locals, and I'd be happy to take you there after the meeting, if you're up for it. Anyway, I know we have a lot to cover, so shall we get started?",
    "It's really great to finally meet you in person. Emails only go so far, don't they? I hope you found the place without too much trouble. The traffic in this part of Seoul can be unpredictable. Is this your first time in Korea? Oh, wonderful. How are you finding it so far? I always think the first trip is the most interesting, because everything feels a little different. How long are you staying? If you have a free evening, I'd love to take you out for Korean barbecue. There's a place near your hotel that's popular with locals, and it's a great way to see a different side of the city. No pressure, of course. I know business trips can be packed. Well, I'm conscious that your time is valuable, so shall we get started? I think we have some exciting things to talk about."
  ],
  t:[
    "질문 두 개와 “Shall we get started?”만 익혀도 어색하지 않아요.",
    "상대가 답하면 다음 질문으로 자연스럽게 이어가 보세요.",
    "추천(I'd recommend ~)과 작은 제안으로 친근감을 만드세요.",
    "식사 초대처럼 구체적인 제안을 하면 관계가 한 단계 가까워져요.",
    "부담 없이(No pressure) 제안하고, 상대의 시간을 존중하며 본론으로 넘어가세요."
  ]
}

);
