/* Original adult study prompts with linked companion commentary.
   Each row is a distinct lesson. Legacy IDs preserve existing saved records.
   This module never modifies children's tracks, activities, or storage. */
function eventGroup(id,name,testament,description,rows,type='Narrative event'){
 return {id,name,testament,description,rows,type};
}
const BIBLE_EVENT_GROUPS = [
eventGroup('beginnings','01. Creation and the first world','OT','Genesis 1-11. Creation, rebellion, judgment, and covenant each receive a separate study.',[
 ['creation','God creates the world','Genesis 1:1-25','Genesis begins with God bringing order and life into the world.',[
  ['God speaks with authority','The account begins with God’s action. Worship rests on His authority rather than human achievement or control.'],
  ['Order serves life','God distinguishes spaces, seasons, and living creatures. Treat the world as a responsibility rather than disposable material.'],
  ['Goodness calls for gratitude','The repeated judgment of goodness directs attention to God’s work. Thank Him for ordinary provision and care for shared resources.']], 'How does belief in the Creator affect our use of resources?','Agree on one responsible change in your use of water, food, or household property.'],
 ['humanity','Human beings bear God’s image','Genesis 1:26-31','The account gives male and female a shared dignity and responsibility.',[
  ['Both share human dignity','Male and female bear God’s image. Income, influence, and education do not give one spouse a greater human worth.'],
  ['Rule includes care','Humanity receives responsibility within creation. Power should serve people and protect what God entrusts.'],
  ['Provision is a gift','God provides food and declares His work good. Gratitude does not turn this description into a guarantee of personal wealth.']], 'Where have we confused status with worth?','Each name one practical way to honour the other person’s dignity.'],
 ['eden-marriage','Eden, work, and the first marriage','Genesis 2:4-25','The garden account describes work, a command, and the union of the man and woman.',[
  ['Responsibility includes a boundary','The man receives a task and a prohibition. Freedom does not remove accountability to God.'],
  ['Companionship answers isolation','The woman is a fitting partner sharing humanity with the man. Partnership requires listening and cooperation.'],
  ['Marriage creates a committed bond','Leaving and cleaving describe a new union. Set respectful boundaries with relatives while preserving responsible care.']], 'Which outside pressure interferes with our partnership?','Agree on a boundary which strengthens your marriage and respects relatives.'],
 ['fall'],
 ['cain-abel','Cain kills Abel','Genesis 4:1-16','The first brothers bring offerings, and Cain’s resentment becomes violence.',[
  ['Address anger before action','God warns Cain before the murder. Resentment needs attention rather than permission to punish someone.'],
  ['Religion does not excuse harm','Cain’s offering does not cancel responsibility for Abel’s life. Private conduct matters alongside public worship.'],
  ['Accountability keeps the victim visible','God asks about Abel and imposes consequences. Concern for repentance must include protection and care for people harmed.']], 'How do we respond when someone else receives approval?','Discuss a resentment honestly and stop one retaliatory habit.'],
 ['noah-ark','Noah prepares the ark','Genesis 6:5-22','Widespread violence precedes judgment, while Noah receives instructions for preserving life.',[
  ['Evil requires moral attention','The account names corruption and violence. Evaluate accepted practices against God’s standard rather than social popularity.'],
  ['Obedience takes careful work','Noah receives detailed instructions. Faithful response requires preparation and follow-through rather than enthusiasm alone.'],
  ['Trust becomes action','Noah does what God commands. Move from agreement about a clear duty to a practical response.']], 'Which clear duty have we postponed?','Complete one neglected responsibility together.'],
 ['flood','The flood and the waters receding','Genesis 7-8','Noah enters the ark, the flood comes, and the waters eventually recede.',[
  ['Judgment is serious','The narrative describes devastating loss. Read with moral attention instead of treating suffering as entertainment.'],
  ['Waiting requires attention','Noah observes signs and leaves when instructed. Patience includes evidence and restraint rather than frustration alone.'],
  ['Relief leads to worship','Noah offers worship after leaving the ark. Make gratitude definite after a crisis passes.']], 'How do we express gratitude after receiving help?','Record one past mercy and pray in gratitude together.'],
 ['rainbow','God’s covenant with Noah','Genesis 9:1-17','After the flood, God addresses Noah’s household and establishes a covenant concerning the earth.',[
  ['Life has dignity','Protection of human life rests on God’s image. Respect should shape your words and treatment of vulnerable people.'],
  ['The promise includes creation','The covenant includes descendants and living creatures. God’s concern extends beyond one household’s convenience.'],
  ['The sign has a stated meaning','The rainbow belongs to a particular promise. Read its meaning from the passage without inventing guarantees of personal success.']], 'What does God promise in this covenant?','Write the promise accurately and discuss one way to honour human life.'],
 ['babel','The tower of Babel','Genesis 11:1-9','A united population builds a city and tower to establish its name and resist dispersion.',[
  ['Unity needs moral direction','The people agree on self-exaltation. Shared ambition still needs examination even when both spouses support the plan.'],
  ['Pride seeks control','The builders want a name and security on their terms. Ask whether public recognition governs your decisions.'],
  ['God limits the project','The builders scatter despite their plan. Hold achievement humbly rather than making success the measure of your family’s worth.']], 'Which ambition depends on proving ourselves to others?','Review a shared goal and name a purpose beyond personal recognition.']
]),
eventGroup('abraham','02. Abraham and Sarah','OT','Genesis 12-23. Follow the call and covenant through distinct encounters and decisions.',[
 ['abram-call','God calls Abram','Genesis 12:1-9','Abram receives a call to leave and a promise of blessing for other families.',[
  ['God initiates the call','The promise begins with God. Do not label a self-chosen ambition a divine instruction without support from Scripture.'],
  ['Obedience affects the household','Abram leaves with others. Shared decisions require preparation and honest discussion of their effects.'],
  ['Worship accompanies change','Abram builds altars during travel. Keep prayer and Scripture attention within a transition.']], 'What does faithful action require in our present transition?','Agree on a practical duty and a regular shared prayer time.'],
 ['abram-egypt','Abram conceals his marriage in Egypt','Genesis 12:10-20','Famine takes Abram to Egypt, where fear leads him to conceal the truth about Sarai.',[
  ['Fear produces deception','Abram seeks safety through Sarai’s vulnerability. Do not protect yourself by exposing your spouse to danger or humiliation.'],
  ['A lie spreads harm','The concealment affects Sarai and Pharaoh’s household. Consider everyone affected by a misleading account.'],
  ['Correction deserves attention','Pharaoh confronts Abram. Receive justified correction even from someone outside your religious community.']], 'Where does self-protection tempt us to hide truth?','Correct a misleading statement and accept responsibility for its effects.'],
 ['abram-lot','Abram and Lot separate','Genesis 13','Their growing possessions create conflict over shared land.',[
  ['Increase brings new duties','More resources strain the arrangement. Greater income still requires clear responsibility and boundaries.'],
  ['Generosity helps resolve conflict','Abram offers Lot the first choice. Fairness sometimes requires yielding an advantage.'],
  ['Appearance is incomplete evidence','The attractive land lies near a corrupt city. Consider moral surroundings alongside visible benefits.']], 'Which attractive option needs deeper examination?','Resolve a disagreement through a fair offer rather than a demand.'],
 ['lot-rescue','Abram rescues Lot and meets Melchizedek','Genesis 14','Warfare captures Lot, and Abram acts to rescue him before receiving a blessing.',[
  ['Disagreement does not cancel care','Abram helps the relative who separated from him. Necessary care need not depend on perfect agreement.'],
  ['Success calls for gratitude','Melchizedek directs honour toward God. Acknowledge help instead of treating achievement as entirely your own.'],
  ['Offers have moral terms','Abram refuses a compromising reward. Review the obligations attached to gifts and favours.']], 'Which offer brings obligations we need to examine?','Discuss the terms of a financial offer before accepting.'],
 ['abram-covenant','God confirms His covenant with Abram','Genesis 15','Abram asks about the promised heir, and God confirms His purpose.',[
  ['Faith speaks honestly','Abram expresses concern about waiting. Prayer has room for difficult questions.'],
  ['Trust receives God’s word','Abram believes the promise. Faith rests on God rather than the ability to control a result.'],
  ['Promise includes hardship','The announced future includes affliction. God’s purpose does not guarantee an immediate life without difficulty.']], 'How do we discuss waiting without blaming each other?','Pray honestly about an unresolved concern and identify a present duty.'],
 ['hagar','Hagar flees and encounters God','Genesis 16','Sarai and Abram’s plan produces conflict, and Hagar flees into the wilderness.',[
  ['Impatience burdens others','Their plan places Hagar in a painful power struggle. Do not use another person to solve your frustration.'],
  ['God notices the overlooked','Hagar is addressed by name. Listen to people whose needs receive little attention.'],
  ['Read the command in context','The instruction to Hagar concerns this event. The passage does not require abused people generally to remain in danger.']], 'Who bears the cost of our impatience?','Listen to a person affected by your decisions and address a practical need.'],
 ['abraham-names','Abraham and Sarah receive new names','Genesis 17','God renews the covenant and identifies Sarah’s place within the promise.',[
  ['God defines the promise','The covenant centres on His declared purpose. Do not replace its stated meaning with your own guarantee.'],
  ['Sarah has a named role','God includes Sarah explicitly. Recognise both spouses in shared spiritual responsibility.'],
  ['Response includes obedience','Abraham carries out the covenant instruction. Read the sign historically before considering later New Testament teaching.']], 'Do both spouses receive a voice in our spiritual decisions?','Give each other time to describe a shared responsibility.'],
 ['abraham-visitors','The visitors and Abraham’s intercession','Genesis 18','Visitors announce Sarah’s son, and Abraham appeals concerning Sodom.',[
  ['Hospitality takes work','Abraham’s welcome involves food and attention. Share the practical work rather than exhausting one spouse.'],
  ['Doubt needs honest speech','Sarah’s laughter receives an answer. Admit uncertainty rather than hiding behind religious language.'],
  ['Intercession concerns justice','Abraham asks about righteous and wicked people. Pray with concern for others’ lives rather than personal comfort alone.']], 'Whose situation needs our intercession?','Share a hospitality task and pray for a person facing injustice.'],
 ['sodom','Lot escapes Sodom','Genesis 19:1-29','Violent wickedness precedes judgment, and Lot’s household receives an urgent warning.',[
  ['Name the threat clearly','The crowd threatens abuse. Keep the danger to vulnerable people visible when discussing the event.'],
  ['Hesitation creates risk','Lot delays despite warning. Act promptly when protection requires a decision.'],
  ['Attachment obstructs departure','Lot’s wife looks back. Examine a harmful attachment which draws you toward a wrong course again.']], 'What harmful situation are we slow to leave?','Agree on a protective boundary and follow through.'],
 ['isaac-birth','Isaac is born and Hagar receives help','Genesis 21:1-21','Isaac’s birth brings joy, followed by conflict involving Hagar and Ishmael.',[
  ['Fulfilment leads to gratitude','Sarah’s joy follows the promised birth. Receive a good outcome gratefully rather than as entitlement.'],
  ['Joy does not cancel responsibility','The household’s conflict affects others. A blessing does not excuse neglect of people hurt by earlier decisions.'],
  ['God hears distress','God attends to Hagar and her son. Notice needs outside the circle celebrating success.']], 'Who needs care while we celebrate?','Thank God for a blessing and help someone under strain.'],
 ['isaac-test','Abraham’s testing on Mount Moriah','Genesis 22:1-19','Abraham faces a specific test concerning Isaac, and God stops the sacrifice.',[
  ['This is an exceptional test','The narrator names a particular test. The passage never authorises harming a child or obeying a claimed command to abuse someone.'],
  ['God forbids the harm','The angel stops Abraham and a ram is provided. Keep the whole event in view, especially the intervention.'],
  ['Trust receives provision','The renewed promise directs attention to God. Faith should lead to obedient care rather than reckless imitation.']], 'Why is the stopping of the sacrifice essential to the reading?','Discuss a costly duty of faithful care without inventing an extreme test.'],
 ['sarah-burial','Abraham mourns and buries Sarah','Genesis 23','Abraham mourns Sarah and purchases a burial site through public negotiation.',[
  ['Faith leaves room for grief','Abraham mourns despite God’s promises. Allow grief instead of demanding an immediate appearance of strength.'],
  ['Practical terms matter','The purchase includes witnesses and payment. Clear arrangements help protect people during distress.'],
  ['Hope includes present duties','A burial place is secured in the promised land. Carry necessary responsibilities while holding hope beyond loss.']], 'How do we support grief through presence and practical help?','Offer one specific form of support to a bereaved person.']
]),
eventGroup('jacob','03. Isaac, Rebekah, Jacob, and Esau','OT','Genesis 24-36. Marriage, rivalry, deception, and reconciliation remain separate lessons.',[
 ['rebecca','Rebekah agrees to marry Isaac','Genesis 24','Abraham’s servant meets Rebekah, and her family asks for her response.',[
  ['Prayer accompanies observation','The servant prays and notices kindness. Attend to character rather than seeking a sign which avoids responsible judgment.'],
  ['Consent receives a voice','Rebekah is asked whether she will go. Family plans should not erase a person’s response.'],
  ['Partnership includes emotional care','Isaac receives comfort after loss. Marriage includes patience with grief and adjustment.']], 'Which decision requires more listening?','Listen to your spouse’s concern without interrupting.'],
 ['birthright','Esau sells his birthright','Genesis 25:19-34','Family favouritism and an impulsive exchange shape the twins’ relationship.',[
  ['Favouritism fuels rivalry','Each parent favours a different son. Unequal affection damages trust within a household.'],
  ['Urgency distorts judgment','Esau trades a lasting responsibility for food. Pause before letting immediate discomfort decide a serious matter.'],
  ['Exploitation is not wisdom','Jacob uses vulnerability for advantage. A clever bargain still requires moral examination.']], 'Which immediate desire threatens a lasting duty?','Delay a pressured decision until you have discussed its effects.'],
 ['isaac-wells','Isaac’s wells and peace agreement','Genesis 26:12-33','Water disputes interrupt Isaac’s settlement before a peace agreement is reached.',[
  ['Success creates new pressure','Isaac’s increase brings envy. Prosperity still requires restraint and clear judgment.'],
  ['Yielding sometimes preserves peace','Isaac moves after disputes. Consider a peaceful alternative without making every right a confrontation.'],
  ['Peace needs clear terms','The leaders make an agreement. A repaired relationship benefits from specific commitments.']], 'What recurring dispute needs explicit terms?','Write a fair agreement about a recurring household disagreement.'],
 ['jacob-deception','Jacob deceives Isaac','Genesis 27:1-40','Rebekah and Jacob arrange a disguise to obtain Isaac’s blessing.',[
  ['Desired outcomes do not excuse deceit','The plan manipulates Isaac’s limitations. Refuse an advantage which depends on abusing another person’s trust.'],
  ['Repeated lies deepen the wrong','Jacob answers falsely to maintain the disguise. Stop a misleading account before it requires further deception.'],
  ['The family bears the consequences','Esau’s distress exposes the harm. Consider the people who pay for your private scheme.']], 'What are we tempted to gain through manipulation?','Replace a manipulative approach with an honest request.'],
 ['bethel','Jacob dreams at Bethel','Genesis 28:10-22','During his journey away from home, Jacob receives a dream concerning God’s presence.',[
  ['God meets uncertainty','The promise comes while Jacob is displaced. Security does not depend entirely on personal arrangements.'],
  ['Recognition leads to reverence','Jacob acknowledges the encounter. Give spiritual attention to an unsettled season.'],
  ['Faith needs more than a bargain','Jacob responds with a vow. Do not make obedience conditional on receiving your preferred result.']], 'Where do we treat faith as a bargain?','Name a faithful action independent of the outcome you want.'],
 ['leah-rachel','Laban deceives Jacob concerning marriage','Genesis 29:1-30','Jacob’s work for marriage ends in deception and an unequal household arrangement.',[
  ['Deception causes personal pain','Jacob learns he has been misled. Recognition of harm should encourage repentance rather than retaliation.'],
  ['Power must respect people','Laban arranges marriages for advantage. Dependence does not erase another person’s dignity.'],
  ['Description differs from approval','The narrative records unequal affection and multiple marriages. Their presence in the account does not make them a model to copy.']], 'How does unequal consideration affect trust?','Correct a pattern in which one person’s needs receive less attention.'],
 ['family-rivalry','Leah and Rachel’s household rivalry','Genesis 29:31-30:24','The sisters’ rivalry affects children and other women within the household.',[
  ['God notices the unloved','Leah’s distress receives attention. Listen to the person who feels overlooked.'],
  ['Comparison intensifies pain','Rachel compares herself with Leah. Refuse to measure a spouse through fertility, possessions, or another family.'],
  ['People are not competition tools','Servants and children enter the rivalry. Protect people from being used to prove status or obtain affection.']], 'Where has comparison entered our relationship?','Stop one repeated comparison and affirm each person’s dignity.'],
 ['peniel','Jacob wrestles at Peniel','Genesis 32','Jacob prepares to meet Esau and experiences a night-long struggle.',[
  ['Prayer admits dependence','Jacob acknowledges mercy and fear. Honest prayer does not present virtue as a claim over God.'],
  ['The struggle changes Jacob','He receives a new name while seeking a blessing. Dependence matters more than confidence in personal control.'],
  ['Significance includes limitation','Jacob leaves limping. A spiritual encounter does not require removal of every weakness.']], 'Which limitation calls us toward humility?','Receive help with a limitation instead of pretending complete independence.'],
 ['jacob-esau','Jacob and Esau meet again','Genesis 33:1-17','Jacob approaches the brother he wronged, and Esau welcomes him.',[
  ['Repair begins with an approach','Jacob moves toward Esau humbly. Start an honest conversation instead of waiting indefinitely.'],
  ['A welcome makes room for peace','Esau embraces Jacob. Hear a repentant approach without assuming trust is rebuilt instantly.'],
  ['Peace respects practical limits','Jacob considers the pace of the vulnerable. Reconciliation still needs sensible boundaries and realistic expectations.']], 'What would a humble first step toward repair look like?','Begin a repair conversation with your own admission of responsibility.'],
 ['dinah','Dinah’s violation and violent retaliation','Genesis 34','Dinah suffers abuse, followed by deceptive negotiation and her brothers’ violence.',[
  ['Keep the person harmed visible','Dinah’s experience must not disappear behind concern for family reputation. Support safety, dignity, and care.'],
  ['An arrangement does not erase abuse','Gifts and marriage negotiations do not replace accountability or consent. Refuse a settlement which silences the harmed person.'],
  ['Retaliation adds injustice','The brothers kill and plunder indiscriminately. Anger at wrongdoing does not justify harming others.']], 'How should our household respond to a report of abuse?','Agree to prioritise safety, listening, and responsible support.']
]),
eventGroup('joseph','04. Joseph’s story','OT','Genesis 37-50. Betrayal, temptation, waiting, leadership, and reconciliation each have their own study.',[
 ['joseph-dreams','Joseph’s dreams and family resentment','Genesis 37:1-11','Jacob’s favouritism and Joseph’s dreams deepen tension among the brothers.',[
  ['Favouritism harms relationships','The special garment signals unequal treatment. Give fair attention without making children compete for approval.'],
  ['Speech affects existing tensions','Joseph’s reports provoke anger. Truthful speech still needs sensitivity to its setting.'],
  ['Envy needs early correction','Resentment develops before open betrayal. Address jealousy before it becomes a settled hostility.']], 'What repeated comparison creates resentment?','Remove a comparison and give attention to someone overlooked.'],
 ['joseph-sold','Joseph is sold and Jacob deceived','Genesis 37:12-36','The brothers sell Joseph and present false evidence about his disappearance.',[
  ['Agreement does not justify cruelty','Several brothers cooperate in harming Joseph. Refuse a wrong plan even when disagreement risks approval.'],
  ['Profit compounds betrayal','Joseph becomes a means of gain. Never turn a vulnerable person into a financial opportunity.'],
  ['Concealment spreads grief','False evidence causes Jacob distress. Honesty must include repairing the effects of hidden truth.']], 'What truth are we withholding to protect ourselves?','Correct a harmful concealment and accept the cost of honesty.'],
 ['judah-tamar','Judah recognises his wrongdoing toward Tamar','Genesis 38','Judah neglects Tamar’s position and condemns her before evidence exposes his involvement.',[
  ['Neglected duty creates vulnerability','Judah withholds what Tamar expects. Examine responsibilities postponed while another person bears the cost.'],
  ['A double standard needs exposure','Judah condemns conduct involving himself. Apply the same moral scrutiny to yourself as to others.'],
  ['Admission starts accountability','Judah acknowledges his greater fault. A direct admission matters more than protecting reputation.']], 'Where do we judge others more harshly than ourselves?','Admit a double standard and fulfil a neglected responsibility.'],
 ['joseph-potiphar','Joseph resists temptation and is imprisoned','Genesis 39','Joseph rejects a sexual demand, then suffers a false accusation.',[
  ['Integrity keeps clear boundaries','Joseph refuses repeated pressure. Establish practical boundaries before a risky situation develops.'],
  ['Leaving is a responsible response','Joseph escapes the immediate situation. Remove yourself rather than negotiate continued exposure to temptation.'],
  ['Injustice does not prove abandonment','The narrative affirms God’s presence in prison. Faithfulness does not guarantee immediate vindication.']], 'Which boundary protects our marital faithfulness?','Agree on a clear boundary concerning messages, meetings, or secrecy.'],
 ['joseph-prison','Joseph serves others in prison','Genesis 40','Joseph notices two officials’ distress, interprets their dreams, and is later forgotten.',[
  ['Service notices distress','Joseph asks why the officials are troubled. Care begins through attention rather than waiting for a formal request.'],
  ['Ability calls for humility','Joseph attributes interpretation to God. Use skill responsibly without claiming personal control over God’s answers.'],
  ['Help is not guaranteed in return','The cupbearer forgets Joseph. Seek assistance without treating service as a transaction.']], 'Who needs attention while we wait for our own situation to change?','Offer useful help without requiring a return favour.'],
 ['joseph-pharaoh','Joseph interprets Pharaoh’s dreams','Genesis 41:1-36','Troubling dreams bring Joseph before Pharaoh and lead to a plan for famine.',[
  ['Joseph redirects honour','He attributes the answer to God. Credit abilities honestly rather than exaggerating personal importance.'],
  ['A warning needs preparation','Plenty will precede famine. Responsible planning attends to difficult conditions as well as present abundance.'],
  ['Wisdom becomes a plan','Joseph proposes organised storage. Prayer about money should accompany budgets and clear responsibilities.']], 'What future pressure needs preparation today?','Review your budget and agree on a realistic preparation step.'],
 ['joseph-governor','Joseph governs through plenty and famine','Genesis 41:37-57','Joseph receives authority and organises the collection and distribution of grain.',[
  ['Leadership serves wider needs','Joseph’s role concerns many people. Evaluate authority by its effect on those dependent on the decisions.'],
  ['Plenty needs restraint','Grain is stored during abundance. Prepare rather than spending as though circumstances will never change.'],
  ['Administration responds to need','Distribution begins when people seek food. A plan succeeds only when necessary help reaches people.']], 'How do we prepare during a good season?','Set a realistic household saving target and agree who will track progress.'],
 ['joseph-brothers','Joseph’s brothers seek food in Egypt','Genesis 42','The brothers meet Joseph without recognising him and remember their earlier guilt.',[
  ['Past wrongdoing still matters','The brothers recall Joseph’s distress. Repentance names the wrong instead of explaining it away.'],
  ['Hidden grief remains real','Joseph withdraws to weep. A calm outward response does not mean the harm has disappeared.'],
  ['Fear makes trust costly','Jacob fears another loss. Respond patiently to someone whose experience has damaged trust.']], 'Which earlier wrong still affects trust between us?','Discuss a specific repair without demanding immediate trust.'],
 ['judah-benjamin','Judah offers himself for Benjamin','Genesis 43-44','Judah takes responsibility for Benjamin and later pleads to remain in his place.',[
  ['Responsibility exceeds a promise','Judah accepts personal cost. Commitment needs reliable conduct rather than words alone.'],
  ['Change considers others’ pain','Judah describes his father’s grief. Compare this concern with the earlier betrayal of Joseph.'],
  ['Love refuses an easy escape','Judah offers to stay. Protect a vulnerable person even when doing so costs convenience.']], 'What conduct would demonstrate a change in us?','Fulfil a costly commitment rather than repeating a promise.'],
 ['joseph-revealed','Joseph reveals his identity','Genesis 45','Joseph identifies himself and provides for his family during famine.',[
  ['Truth makes repair possible','Joseph names the sale as well as his identity. Reconciliation requires an honest account of the original wrong.'],
  ['Providence does not excuse betrayal','Joseph recognises God’s preserving purpose. A good outcome does not make harmful conduct right.'],
  ['Reconciliation includes practical care','Joseph arranges provision. Peace needs responsible action alongside words of forgiveness.']], 'How do we recognise mercy without excusing harm?','Choose a truthful and practical step toward repairing a relationship.'],
 ['joseph-reassures','Joseph reassures his brothers','Genesis 50:15-26','After Jacob’s death, the brothers fear retaliation and Joseph promises care.',[
  ['Fear sometimes outlasts a welcome','The brothers still expect revenge. Trust often needs reassurance through consistent conduct.'],
  ['Joseph refuses revenge','He rejects taking God’s place. Do not make personal punishment the purpose of a relationship.'],
  ['Hope extends beyond one life','Joseph speaks of a future departure from Egypt. Faith holds a purpose beyond immediate comfort.']], 'Do our actions reassure someone who fears retaliation?','Give a specific reassurance and follow through reliably.']
]),
eventGroup('exodus','05. Moses and deliverance from Egypt','OT','Exodus 1-15. Oppression, calling, the plagues, and rescue remain separate events.',[
 ['midwives','The midwives refuse Pharaoh’s order','Exodus 1:8-22','Pharaoh orders the killing of Hebrew newborn boys.',[
  ['Authority has moral limits','The midwives refuse a murderous instruction. A superior’s command never removes personal responsibility for harm.'],
  ['Courage protects life','Their refusal preserves vulnerable children. Faithfulness includes practical protection rather than concern expressed only in words.'],
  ['Oppression needs clear naming','Pharaoh widens his command. Recognise a harmful system instead of blaming its victims.']], 'Where does authority conflict with a moral duty?','Identify a duty to protect someone and take a responsible step.'],
 ['moses-birth','Moses is hidden and rescued','Exodus 2:1-10','Moses’ family protects him, and Pharaoh’s daughter receives him from the river.',[
  ['Care takes practical form','The basket and watchful sister show preparation. Love includes planning and attention.'],
  ['Compassion crosses boundaries','Pharaoh’s daughter recognises a Hebrew child and responds with compassion. Care must extend beyond your own social group.'],
  ['Cooperation protects the vulnerable','The sister’s intervention reconnects mother and child. A timely small action matters within a larger act of care.']], 'Who needs practical protection?','Agree on a specific way to support a vulnerable child or family.'],
 ['moses-midian','Moses flees to Midian','Exodus 2:11-25','Moses kills an Egyptian, flees, and begins another life while Israel continues to suffer.',[
  ['Concern does not excuse violence','Moses reacts to injustice through killing. A valid concern still needs a responsible response.'],
  ['Change includes ordinary duties','Moses helps at a well and builds a household. Attend to present duties during an unsettled season.'],
  ['God hears suffering','Israel’s cries receive attention. Prayer belongs alongside practical concern for people enduring oppression.']], 'How do we oppose injustice without adding harm?','Choose a protective response to a known injustice.'],
 ['burning-bush','God calls Moses at the burning bush','Exodus 3-4:17','God speaks while Moses tends sheep and sends him to lead Israel out of Egypt.',[
  ['Reverence attends to God','Moses receives an instruction about holy ground. Approach God with attention rather than casual claims about His will.'],
  ['Calling addresses others’ suffering','God names oppression and commissions service. Responsibility concerns people rather than status alone.'],
  ['Weakness invites appropriate help','Moses receives assistance through Aaron. Seek help without making limitation an excuse for every duty.']], 'Which duty needs help rather than further avoidance?','Ask for appropriate assistance and take a practical first step.'],
 ['pharaoh-labour','Moses confronts Pharaoh and labour increases','Exodus 5:1-6:13','Pharaoh rejects the demand and increases the workers’ burden.',[
  ['A faithful step faces resistance','The first confrontation worsens conditions. Difficulty alone does not prove a necessary duty was wrong.'],
  ['Listen to those bearing the cost','The workers suffer and complain. Leadership must hear distress rather than dismissing affected people.'],
  ['Prayer includes honest questions','Moses brings discouragement to God. Speak plainly about confusion while remaining attentive to responsibility.']], 'How do we support someone affected by a difficult decision?','Name the consequence honestly and arrange practical support.'],
 ['early-plagues','Water, frogs, gnats, and flies','Exodus 7:14-8:32','Early plagues challenge Pharaoh’s refusal to release Israel.',[
  ['Pride imposes public costs','Pharaoh’s refusal affects the land. Consider who bears the consequences of a leader’s insistence.'],
  ['Relief differs from repentance','Pharaoh seeks help then refuses again. A request for relief needs to become changed conduct.'],
  ['Compromise sometimes preserves control','Pharaoh offers limited terms and withdraws them. Examine whether your apology conceals an effort to retain harmful control.']], 'Does relief change our behaviour?','Keep a commitment made during a difficult period.'],
 ['later-plagues','Disease, hail, locusts, and darkness','Exodus 9-10','Further plagues follow repeated refusal, with warnings before particular judgments.',[
  ['A warning needs action','Some servants shelter people and animals. Act on credible protective information rather than dismissing unwelcome facts.'],
  ['Words alone do not prove change','Pharaoh admits wrongdoing and returns to refusal. Evaluate repentance by later conduct.'],
  ['Listen when harm widens','Pharaoh’s servants recognise devastation. Repeated costs to others require reconsideration of a stubborn decision.']], 'Which warning have we repeatedly ignored?','Review a harmful pattern and act on credible advice.'],
 ['passover'],
 ['egypt-departure','Israel leaves Egypt','Exodus 12:31-13:22','Israel departs and receives instructions for remembrance as God directs the route.',[
  ['Freedom follows real suffering','The departure ends a long oppression. Remember the experience preceding relief rather than judging people solely by present conditions.'],
  ['Memory needs instruction','The people must explain their deliverance. Preserve a clear account of help received.'],
  ['The route is not the shortest','God leads another way. A longer process does not automatically mean failure.']], 'How do we judge slow progress?','Name the next responsible duty within a current transition.'],
 ['red-sea'],
 ['song-sea','Moses and Miriam lead praise','Exodus 15:1-21','The people celebrate deliverance through a song naming God’s work and character.',[
  ['Praise remembers specific help','The song recounts the crossing. Concrete remembrance deepens gratitude beyond routine phrases.'],
  ['Worship attends to God’s character','Holiness, mercy, and rule appear in the song. Keep God central rather than personal achievement.'],
  ['Shared worship includes different voices','Miriam leads a response. Make room for both spouses to lead prayer and thanksgiving.']], 'Do both of us receive space to lead gratitude?','Each lead a prayer naming one specific mercy.']
]),
eventGroup('wilderness','06. Sinai and the wilderness','OT','Exodus 15 through Deuteronomy 34. Provision, covenant, rebellion, and leadership are separate lessons.',[
 ['marah','Bitter water at Marah','Exodus 15:22-27','Israel encounters undrinkable water soon after deliverance.',[
  ['A new difficulty tests memory','The people complain after a recent rescue. Remember past help without denying a present need.'],
  ['Moses brings the need to God','He cries for help. Move from accusation toward prayer and responsible problem-solving.'],
  ['Provision brings instruction','The event includes a call to listen. Receive relief with renewed attention to obedience.']], 'How do we speak when a new problem follows good news?','Describe a need without blaming your spouse.'],
 ['manna','Manna, quail, and daily provision','Exodus 16','Food is supplied with instructions concerning gathering and rest.',[
  ['Need becomes an accusation','The people idealise Egypt when hungry. Stress should not rewrite the past or make another person the enemy.'],
  ['Provision includes restraint','Gathering follows particular limits. Enough requires disciplined use rather than anxious accumulation.'],
  ['Rest requires trust','The Sabbath arrangement limits work. Agree on rest while carrying necessary duties responsibly.']], 'What anxiety drives unnecessary accumulation?','Review spending and agree on a realistic rest routine.'],
 ['rephidim','Water from the rock at Rephidim','Exodus 17:1-7','Thirst produces conflict, and Moses receives an instruction for supplying water.',[
  ['A real need deserves attention','The thirst is real even though accusation is wrong. Listen to needs without endorsing hostile speech.'],
  ['Moses seeks direction','He asks what to do. Respond to pressure through prayer and clear action rather than retaliation.'],
  ['Testing God misreads His presence','The people question whether God is among them. Difficulty is not proof of abandonment.']], 'Do we mistake difficulty for abandonment?','Pray about a need and make a practical plan without accusations.'],
 ['amalek','Israel faces Amalek','Exodus 17:8-16','Joshua leads the fighting while Moses, Aaron, and Hur support the effort.',[
  ['Responsibility has different roles','Joshua acts below while Moses remains above. Different duties serve one shared purpose.'],
  ['Weariness needs support','Aaron and Hur help Moses’ arms. Receive assistance instead of equating leadership with solitary endurance.'],
  ['The memory directs honour to God','Moses builds an altar. Do not turn this historical battle into permission for hostility toward neighbours.']], 'Which duty becomes difficult because one of us carries too much?','Redistribute a tiring responsibility fairly.'],
 ['jethro','Jethro advises Moses to share leadership','Exodus 18','Jethro observes Moses’ workload and recommends delegated judgment.',[
  ['A good duty becomes excessive','Moses handles every dispute. Serving others still needs attention to sustainable capacity.'],
  ['Correction comes through observation','Jethro names the strain plainly. Listen when someone identifies a pattern of exhaustion.'],
  ['Delegation needs character and limits','The proposed helpers require integrity and clear responsibilities. Shared work needs defined authority and escalation.']], 'Which task depends unnecessarily on one person?','Assign a household duty with clear responsibility and realistic limits.'],
 ['sinai'],
 ['golden-calf','Israel makes the golden calf','Exodus 32','During Moses’ absence, the people request an image and Aaron participates.',[
  ['Delay exposes impatience','The people seek a visible substitute. Waiting does not justify replacing obedience with a reassuring invention.'],
  ['Leadership must resist pressure','Aaron cooperates with the demand. Popular agreement does not excuse leading others into wrongdoing.'],
  ['Intercession and accountability belong together','Moses pleads and confronts the sin. Mercy does not require concealing a harmful act.']], 'What substitute do we seek when waiting becomes hard?','Identify an impatient choice and correct the resulting harm.'],
 ['covenant-renewal','The covenant is renewed','Exodus 33:12-34:35','Moses seeks God’s presence after the calf episode, and the covenant is renewed.',[
  ['Presence matters more than progress alone','Moses asks for God to accompany the people. A desired destination does not excuse an unfaithful journey.'],
  ['God names mercy and justice','The declaration joins compassion with accountability. Avoid using mercy to deny consequences.'],
  ['Renewal leads to obedience','Fresh tablets and instructions follow the failure. Repentance needs a changed pattern of life.']], 'What should change after an apology?','Agree on a visible change following a recognised wrong.'],
 ['tabernacle','The tabernacle is completed','Exodus 35:4-36:7; 40','Willing gifts and skilled work lead to the completion of the tabernacle.',[
  ['Giving includes willingness','People contribute according to their response. Generosity should avoid coercion and competitive display.'],
  ['Skill serves worship','Craftspeople carry out defined work. Honour practical ability as well as public leadership.'],
  ['God’s presence remains central','The glory fills the completed structure. The building serves worship rather than becoming the object of pride.']], 'How do we honour quiet practical service?','Thank someone for useful work and contribute responsibly to a shared need.'],
 ['nadab-abihu','Nadab and Abihu offer unauthorised fire','Leviticus 10:1-11','Aaron’s sons depart from the prescribed worship and face judgment.',[
  ['Office does not remove accountability','The men are priests, yet their action is judged. A religious position does not permit careless conduct.'],
  ['Holiness requires attention','The event emphasises God’s holiness. Read worship instructions carefully rather than assuming sincerity excuses every act.'],
  ['Teaching carries responsibility','The surviving priests receive duties of distinction and instruction. Those teaching others need clear judgment and faithful explanation.']], 'Where do we rely on position rather than careful obedience?','Review a responsibility you carry and correct a careless practice.'],
 ['spies','The spies report and Israel refuses to enter','Numbers 13-14','The spies return with conflicting responses to the land and its obstacles.',[
  ['Evidence and interpretation differ','The land’s fruit and inhabitants are observed. A conclusion about impossibility goes beyond the facts themselves.'],
  ['Fear spreads through speech','The negative report leads to rebellion. Share difficulty honestly without exaggerating hopelessness.'],
  ['Late defiance is not obedience','The people later attempt entry against the new instruction. Regret does not justify another disobedient action.']], 'How do we discuss obstacles without spreading panic?','Separate facts, fears, and responsible next steps in one shared concern.'],
 ['korah','Korah’s rebellion','Numbers 16','A challenge to Moses and Aaron develops into an accusation concerning authority.',[
  ['Ambition disguises itself as principle','The protest invokes the people’s holiness while pursuing authority. Examine motives alongside public arguments.'],
  ['God judges the challenge','The narrative presents a particular judgment. Do not use the episode to forbid every question or protect abusive leadership.'],
  ['Intercession seeks preservation','Moses and Aaron act during the ensuing crisis. Responsible leadership cares about people rather than winning an argument.']], 'How do we distinguish honest accountability from personal rivalry?','Raise a concern with evidence and a constructive purpose.'],
 ['meribah','Moses strikes the rock at Meribah','Numbers 20:1-13','Water is needed, and Moses fails to follow the instruction given.',[
  ['Pressure does not excuse disobedience','Moses acts in anger. Exhaustion deserves care, yet harmful behaviour still needs acknowledgment.'],
  ['Past success is not a present rule','An earlier rock episode differs from this instruction. Do not assume a previous method fits every situation.'],
  ['Leadership faces consequences','Moses’ role does not remove accountability. Receive correction without using years of service as a defence.']], 'Where does stress affect our speech and actions?','Plan a pause and a fair division of work during pressure.'],
 ['bronze-serpent','The bronze serpent','Numbers 21:4-9','The people complain, suffer judgment, and receive a specified means of rescue.',[
  ['Complaint misrepresents provision','The people despise what sustains them. Name dissatisfaction without denying actual gifts received.'],
  ['Confession seeks help','They acknowledge wrongdoing and ask Moses to pray. Repentance includes a direct admission rather than indirect blame.'],
  ['The sign points beyond itself','John 3:14-15 later connects the event with Jesus. Do not treat an object as independently possessing saving power.']], 'How do we admit wrongdoing directly?','Make one specific confession and discuss the practical repair required.'],
 ['balaam','Balaam, the donkey, and the attempted curse','Numbers 22-24','Balak seeks a curse against Israel, while Balaam’s journey receives an unexpected interruption.',[
  ['Reward pressures judgment','The invitation carries payment and prestige. Examine how money influences a claimed spiritual decision.'],
  ['Correction exposes blindness','The donkey sees the obstacle before Balaam recognises it. Receive a correction without dismissing its unexpected source.'],
  ['God’s word resists manipulation','The blessings frustrate Balak’s demand. Spiritual speech must not become a paid instrument of another person’s hostility.']], 'What reward pressures us to alter an honest judgment?','Review a decision affected by payment, approval, or status.'],
 ['moses-final','Moses commissions Joshua and dies','Deuteronomy 31:1-8; 34','Moses prepares the people for Joshua’s leadership and dies before entering the land.',[
  ['Leadership prepares a successor','Moses encourages Joshua publicly. Responsible service includes helping another person carry the work.'],
  ['The mission exceeds one leader','The people continue after Moses. Avoid making a shared duty dependent on your personal control.'],
  ['Faithfulness includes limits','Moses sees the land without entering. Honour a life without pretending every desired outcome must arrive within it.']], 'Which responsibility needs continuity beyond our own effort?','Explain a recurring duty clearly so another person is prepared to carry it.']
]),
eventGroup('joshua','07. Entering and settling the land','OT','Joshua 1-24. Crossings, victories, failures, and covenant commitments are studied separately.',[
 ['joshua-commission','Joshua receives his commission','Joshua 1','Joshua receives responsibility after Moses’ death.',[
  ['Courage rests on God’s promise','Joshua receives assurance alongside a task. Confidence should serve obedience rather than personal bravado.'],
  ['Scripture guides conduct','Meditation is linked with doing the instruction. Reading needs practical response.'],
  ['Preparation involves the people','Joshua gives workable directions. A spiritual commitment still requires organisation.']], 'What does courage require in our next duty?','Choose a clear instruction and take a prepared step.'],
 ['rahab','Rahab protects the spies','Joshua 2','Rahab protects the Israelite spies and asks for her family’s preservation.',[
  ['Faith recognises God’s power','Rahab speaks about the Lord despite her background. Do not assume a person’s past prevents a faithful response.'],
  ['Protection involves costly action','She takes a risk to shelter the men. Care sometimes costs convenience and public approval.'],
  ['Promises require clear terms','The agreement specifies responsibilities. A commitment needs clarity rather than assumptions.']], 'Whose past do we allow to overshadow present faithfulness?','Treat someone fairly without reducing them to an earlier failure.'],
 ['jordan','Israel crosses the Jordan','Joshua 3-4','The people cross the river and establish a memorial.',[
  ['Preparation respects God’s instruction','The people attend to the ark and the directions. Do not substitute haste for careful obedience.'],
  ['Shared action follows clear roles','Priests and people have distinct responsibilities. Cooperation benefits from knowing each person’s duty.'],
  ['Memory serves future questions','The stones provide an explanation for later generations. Record specific help rather than vague praise alone.']], 'What mercy should our family remember clearly?','Write a short account of help received and why the memory matters.'],
 ['jericho','Jericho falls','Joshua 6','Israel follows particular instructions before the city falls.',[
  ['The instructions belong to this event','The marching sequence is a historical command. Do not turn the pattern into a guarantee for every modern problem.'],
  ['Obedience includes limits','The people receive restrictions concerning property. A victory does not cancel moral boundaries.'],
  ['The promise to Rahab is honoured','Her household is preserved. Keep a commitment even when circumstances change in your favour.']], 'Which promise needs fulfilment after circumstances improve?','Keep a specific commitment to another person.'],
 ['achan','Achan’s hidden theft and Israel’s defeat','Joshua 7','An initial defeat exposes a concealed breach of the instructions at Jericho.',[
  ['Hidden conduct affects others','Achan’s theft has consequences beyond himself. Private wrongdoing still carries shared costs.'],
  ['Grief requires examination','Joshua seeks an explanation for defeat. Investigate a problem instead of assigning blame without evidence.'],
  ['Judgment needs contextual reading','The episode belongs to Israel’s particular covenant setting. It does not authorise punishing a family for one member’s wrongdoing today.']], 'What concealed choice imposes costs on others?','Disclose a harmful decision and arrange an honest repair.'],
 ['gibeonites','Israel is deceived by the Gibeonites','Joshua 9','A false appearance leads Israel’s leaders into an agreement.',[
  ['Appearance is incomplete evidence','Worn supplies support a misleading account. Investigate important claims rather than relying on presentation.'],
  ['Consultation was neglected','The leaders do not seek the Lord’s counsel. Pause before a serious commitment to pray and review evidence.'],
  ['Promises still require integrity','The oath creates an obligation after discovery. Address deception without treating your own word as disposable.']], 'What agreement requires better checking?','Review the evidence and terms before making a new commitment.'],
 ['southern-battle','Joshua’s battle and the extended day','Joshua 10:1-27','Israel assists Gibeon and the account describes an extraordinary divine intervention.',[
  ['An agreement creates responsibility','Joshua comes to Gibeon’s aid. Promises need practical fulfilment when help becomes costly.'],
  ['Prayer accompanies action','Joshua leads the effort and asks God for help. Dependence does not remove necessary responsibility.'],
  ['The event is exceptional','The narrator describes a unique day. Do not claim control over nature by copying a phrase from the account.']], 'Where does an earlier promise require action now?','Carry out a commitment which has become inconvenient.'],
 ['joshua-covenant','Joshua calls Israel to covenant faithfulness','Joshua 24','Joshua recalls God’s acts and challenges the people concerning allegiance.',[
  ['Memory precedes commitment','The account reviews gifts and deliverance. Obedience responds to mercy rather than self-made importance.'],
  ['Allegiance needs a decision','Joshua confronts divided worship. Name an actual competing loyalty rather than making a vague declaration.'],
  ['Commitment requires follow-through','The covenant includes a witness. Shared words should lead to consistent habits.']], 'Which competing loyalty affects our household?','Remove a habit which conflicts with an explicit biblical duty.']
]),
eventGroup('judges-ruth','08. The judges and Ruth','OT','Judges and Ruth. Distinct rescues and family decisions reveal faithfulness, weakness, and mercy.',[
 ['deborah','Deborah and Barak respond to oppression','Judges 4-5','Deborah directs Barak, and Israel receives deliverance from Sisera’s forces.',[
  ['Leadership serves people under pressure','Deborah’s role includes judgment and direction. Evaluate leadership through faithful service rather than assumptions about status.'],
  ['Courage accepts responsibility','Barak responds to the commission. Support a necessary duty without making personal honour the central aim.'],
  ['Praise remembers contributions','The song recognises willing participation. Honour practical service while reading the warfare in its historical setting.']], 'How do we support each other in a difficult duty?','Offer specific support for a responsibility your spouse carries.'],
 ['gideon-call','God calls Gideon','Judges 6:1-32','Gideon receives a commission during Midianite oppression and confronts worship in his own household.',[
  ['Weakness does not prevent a task','Gideon’s limited position meets God’s call. Humility should not become an excuse for refusing every responsibility.'],
  ['Obedience begins nearby','The altar in his own community receives attention. Address a wrong within your influence before criticising distant problems.'],
  ['Fear and action appear together','Gideon acts at night. Courage sometimes means obeying while fear still needs support.']], 'What nearby responsibility have we avoided?','Take a supported first step toward a clear duty.'],
 ['gideon-army','Gideon’s reduced army','Judges 7','The army is reduced before the confrontation with Midian.',[
  ['Numbers do not define God’s ability','The reduction prevents a claim of self-sufficient victory. Resources matter, yet they are not the object of faith.'],
  ['Encouragement supports obedience','Gideon receives reassurance before acting. Seek truthful encouragement rather than pretending fear does not exist.'],
  ['The method is event-specific','The trumpets and jars belong to this account. Do not convert the pattern into a universal formula for success.']], 'What resource do we treat as our only source of security?','Use available resources responsibly while praying about the task.'],
 ['gideon-ephod','Gideon’s later failure','Judges 8:22-35','After deliverance, Gideon makes an ephod which becomes a source of unfaithfulness.',[
  ['Good words need consistent action','Gideon speaks about God’s rule but makes a troubling object. Evaluate conduct alongside a correct statement.'],
  ['Success brings fresh temptation','Spoils and influence create a new danger. Review choices made after receiving recognition.'],
  ['A leader’s legacy affects others','The object becomes a snare. Consider how habits and symbols influence people following you.']], 'Does success make us less willing to receive correction?','Review a habit which began after a good outcome.'],
 ['jephthah','Jephthah’s rash vow','Judges 11:29-40','Jephthah makes a reckless vow before battle, with devastating consequences for his daughter.',[
  ['A vow does not purchase victory','The Spirit’s coming precedes the vow. Do not bargain with God through an extreme promise.'],
  ['Words impose costs on others','The daughter bears the consequences. Examine a commitment’s effect on people who did not choose it.'],
  ['The narrative is tragic','Interpretations of the precise fulfilment differ, but the loss is explicit. Never use the story to justify harm or coercion.']], 'Which promise has consequences for someone else?','Review a commitment and correct an irresponsible demand on another person.'],
 ['samson-call','Samson’s birth and consecration','Judges 13','Samson’s parents receive an announcement and instructions concerning the child.',[
  ['The announcement begins with God','The child’s role is declared before birth. Parents receive a responsibility rather than ownership of a divine guarantee.'],
  ['The parents seek instruction','Manoah asks how to raise the child. Learning belongs within responsibility.'],
  ['Reverence differs from control','The encounter turns attention to God. Do not treat a child’s future as a means of family prestige.']], 'How do we learn about a responsibility instead of assuming we know?','Seek reliable guidance for a duty you share.'],
 ['samson-delilah','Samson and Delilah','Judges 16:1-22','Samson’s repeated vulnerability ends in betrayal and captivity.',[
  ['Repeated exposure weakens judgment','Samson stays within a damaging pattern. A previous escape does not make a risky habit safe.'],
  ['Secrets are used for exploitation','Delilah seeks the source of his strength. Do not manipulate confidence for money, advantage, or control.'],
  ['Ability is not moral maturity','Samson’s strength does not prevent failure. Giftedness still needs discipline and accountability.']], 'Which repeated risk have we mistaken for safety?','Leave a harmful pattern and establish a practical boundary.'],
 ['samson-final','Samson’s final prayer','Judges 16:23-31','In captivity, Samson prays before his final act against the Philistines.',[
  ['Humiliation exposes dependence','Samson prays from weakness. Bring failure to God without pretending earlier conduct was harmless.'],
  ['Motives need examination','The prayer includes revenge. Read the historical request without treating every motive as an instruction.'],
  ['The account ends in death','The violent ending belongs to Israel’s conflict. It never authorises suicide or indiscriminate violence today.']], 'How do we seek mercy without defending a harmful motive?','Confess a failure and identify a responsible step toward repair.'],
 ['ruth-naomi','Ruth chooses to remain with Naomi','Ruth 1','Bereavement and migration shape Naomi’s return, and Ruth commits to accompany her.',[
  ['Grief deserves honest expression','Naomi speaks from loss. Listen without forcing immediate positive language.'],
  ['Loyalty takes practical form','Ruth commits to a shared journey. Faithful care includes presence and work.'],
  ['The commitment has a clear object','Ruth names Naomi’s people and God. Do not reduce her choice to sentimental affection alone.']], 'What does reliable support require during loss?','Offer a specific act of care to someone grieving.'],
 ['ruth-boaz','Ruth gleans in Boaz’s field','Ruth 2','Ruth seeks food through gleaning and Boaz provides protection and kindness.',[
  ['Need is met through work and care','Ruth works while Boaz helps. Avoid treating poverty as a failure of character.'],
  ['Protection belongs within generosity','Boaz addresses safety as well as food. Care must respect dignity and practical risk.'],
  ['Kindness creates hope','Naomi recognises a possible future. A concrete helpful act sometimes changes a discouraged person’s outlook.']], 'Does our generosity preserve the recipient’s dignity?','Offer practical help without humiliation or unnecessary conditions.'],
 ['ruth-redemption','Boaz redeems the family’s future','Ruth 3-4','Ruth’s request leads to a public agreement, marriage, and the birth of Obed.',[
  ['A request deserves a responsible answer','Boaz acknowledges Ruth and the nearer relative’s role. Good intentions still need clear process.'],
  ['Public terms protect integrity','The gate proceedings establish the arrangement. Important agreements need witnesses and honest records.'],
  ['Ordinary faithfulness has wider effects','The genealogy links the family with David. Do present duties without requiring knowledge of every future result.']], 'Which family agreement needs clearer terms?','Clarify a financial or caregiving agreement with the people affected.']
]),
eventGroup('samuel-saul','09. Samuel and Saul','OT','1 Samuel 1-15. Prayer, calling, kingship, and disobedience each receive a distinct lesson.',[
 ['hannah','Hannah prays and Samuel is born','1 Samuel 1-2:11','Hannah brings her distress to God and later fulfils her commitment concerning Samuel.',[
  ['Distress receives a voice','Hannah prays from deep pain. Do not judge someone’s faith by outward composure.'],
  ['Assumptions require correction','Eli initially misreads her. Listen before assigning a motive to unusual behaviour.'],
  ['Gratitude includes faithfulness','Hannah keeps her commitment. A received answer should lead to responsible conduct.']], 'Where do we assume motives without listening?','Ask a careful question before interpreting someone’s behaviour.'],
 ['samuel-call','Samuel hears God’s call','1 Samuel 3','Samuel learns to recognise the call during a time of limited revelation.',[
  ['Listening involves learning','Samuel initially needs Eli’s help. Receiving guidance is part of growth.'],
  ['The message includes accountability','The word concerns Eli’s household. Spiritual responsibility does not protect wrongdoing from examination.'],
  ['Faithful speech resists concealment','Samuel tells Eli the message. Communicate a serious concern accurately without exaggeration.']], 'How do we receive a difficult correction?','Discuss one concern truthfully and without defensive excuses.'],
 ['ark-captured','The ark is captured','1 Samuel 4','Israel takes the ark into battle but suffers defeat and loses it.',[
  ['A sacred object is not a guarantee','The people treat the ark as a means of automatic victory. Faith must not become dependence on an object or ritual.'],
  ['Noise differs from obedience','The shout impresses listeners but does not repair corruption. Religious intensity is not evidence of faithfulness.'],
  ['Failure has human costs','The narrative records grief and death. Attend to affected people rather than seeking reputation management.']], 'What religious habit do we treat as automatic protection?','Explain the difference between trusting God and depending on a ritual.'],
 ['ark-returned','The ark returns from Philistia','1 Samuel 5-6','The ark’s presence unsettles the Philistines, and they arrange its return.',[
  ['God is not a captured possession','Dagon’s fall reverses the apparent triumph. No group controls God by possessing a symbol.'],
  ['The powerful still face accountability','The Philistine rulers seek a response to affliction. Power does not exempt anyone from moral responsibility.'],
  ['Reverence accompanies reception','The return includes joy and judgment. Receiving a religious object is not a substitute for obedient conduct.']], 'Do we confuse religious possession with faithfulness?','Review a practice and connect it with a clear duty from Scripture.'],
 ['ebenezer','Israel repents at Mizpah','1 Samuel 7','Samuel calls for repentance and later establishes a memorial after deliverance.',[
  ['Repentance removes competing worship','The people put away idols. A confession requires practical change.'],
  ['Prayer joins a faithful response','Samuel intercedes while the people gather. Shared dependence belongs alongside renewed conduct.'],
  ['A memorial remembers help','Ebenezer points to help received. Gratitude should remain specific.']], 'Which concrete change should follow our confession?','Remove one habit conflicting with a biblical duty.'],
 ['king-request','Israel asks for a king','1 Samuel 8','The people request a king despite Samuel’s warning concerning its costs.',[
  ['Real failures require attention','Samuel’s sons abuse their role. Defending an institution must not conceal corruption.'],
  ['Comparison directs the request','The people want to resemble other nations. Examine whose standard governs your family’s decisions.'],
  ['A choice carries consequences','Samuel explains the costs. Listen to an unwelcome warning before committing.']], 'What decision comes mainly from comparison with others?','Review a major choice against its actual purpose and costs.'],
 ['saul-anointed','Saul is anointed and publicly selected','1 Samuel 9-10','Saul meets Samuel and receives confirmation before his public selection.',[
  ['God’s initiative exceeds Saul’s plan','A search for animals becomes a meeting with Samuel. Avoid measuring every opportunity by its first appearance.'],
  ['Confirmation does not ensure lasting obedience','The signs confirm appointment. A spiritual experience still needs faithful conduct afterward.'],
  ['Public responsibility is serious','The people receive a king. Recognition should increase accountability rather than entitlement.']], 'How do we evaluate conduct after a striking experience?','Choose a responsibility requiring consistent follow-through.'],
 ['saul-sacrifice','Saul offers the sacrifice without waiting','1 Samuel 13:1-15','Military pressure leads Saul to act before Samuel arrives.',[
  ['Pressure tests patience','Saul sees people scattering. Fear does not erase a clear instruction.'],
  ['An explanation differs from obedience','Saul describes his circumstances. Naming pressure does not justify ignoring responsibility.'],
  ['Leadership receives correction','Samuel confronts the failure. Receive correction without defending your title or intention.']], 'Which pressure makes us excuse a wrong choice?','Name the wrong directly and plan a better response under pressure.'],
 ['saul-amalek','Saul disobeys concerning Amalek','1 Samuel 15','Saul claims obedience despite withholding parts of the instruction.',[
  ['Partial compliance needs examination','Saul presents the mission as fulfilled. Evaluate the actual action rather than the preferred account.'],
  ['Religion is used as an excuse','Saul invokes sacrifice to defend disobedience. Worship cannot make an immoral choice right.'],
  ['Reputation obstructs repentance','Saul seeks public honour after correction. Prioritise repair over appearance, without copying this historical warfare.']], 'Do our explanations protect reputation instead of changing conduct?','Make a specific admission and repair one consequence.']
]),
eventGroup('david','10. David: calling, conflict, and repentance','OT','1 Samuel 16 through 2 Samuel 24. David’s victories and failures are examined separately.',[
 ['david-anointed','Samuel anoints David','1 Samuel 16:1-13','Samuel visits Jesse’s family and anoints the youngest son.',[
  ['Appearance is incomplete evidence','Samuel initially considers outward stature. Evaluate character rather than relying on presentation or social rank.'],
  ['The overlooked person receives attention','David is brought from the sheep. Do not exclude someone because their role appears ordinary.'],
  ['Appointment begins a responsibility','Anointing is not the end of David’s formation. Recognition should lead to patient faithfulness.']], 'What outward measure dominates our judgments?','Review a judgment about someone using evidence of character.'],
 ['goliath','David confronts Goliath','1 Samuel 17','David responds to the Philistine challenge while Israel’s army is afraid.',[
  ['The challenge concerns allegiance','David speaks about the living God. Keep the passage’s concern distinct from personal ambition.'],
  ['Preparation matters','David recalls earlier responsibilities and uses familiar tools. Courage includes disciplined preparation.'],
  ['Victory directs honour to God','David refuses to treat weapons as the ultimate source of deliverance. Do not turn the event into a promise of winning every contest.']], 'Which duty needs courage and preparation?','Prepare a realistic step toward a responsibility you fear.'],
 ['david-jonathan','Jonathan and David form a covenant','1 Samuel 18:1-16; 20','Jonathan supports David while Saul’s jealousy threatens him.',[
  ['Friendship resists rivalry','Jonathan honours David despite his own position. Another person’s ability need not diminish your dignity.'],
  ['Jealousy distorts authority','Saul’s fear leads to hostility. Do not use influence to punish someone who receives approval.'],
  ['Loyalty protects through action','Jonathan warns and helps David. Faithful friendship includes truthful and practical support.']], 'How do we respond to another person’s success?','Offer practical support to someone whose progress challenges your pride.'],
 ['david-spares','David refuses to kill Saul','1 Samuel 24; 26','David receives opportunities to harm Saul but refuses personal revenge.',[
  ['Opportunity is not permission','Others interpret the moment as approval to kill. Test advice morally instead of treating availability as justification.'],
  ['Restraint refuses retaliation','David leaves Saul alive. Refusing revenge does not require ignoring danger or abandoning protective boundaries.'],
  ['Truth still names the threat','David speaks about Saul’s pursuit. Peaceful conduct includes honest acknowledgment of harm.']], 'What available retaliation should we refuse?','Choose a protective boundary instead of a revenge response.'],
 ['abigail','Abigail prevents David’s retaliation','1 Samuel 25','Nabal’s insult prompts David’s anger, and Abigail intervenes.',[
  ['Insult does not justify violence','David prepares an excessive response. Offence should not determine the scale of your action.'],
  ['Wise intervention names consequences','Abigail speaks about needless bloodshed. Correction serves the person by opposing a destructive choice.'],
  ['Humility receives correction','David listens and changes course. Thank a person who helps you stop a wrong action.']], 'Who has helped us recognise an excessive response?','Pause a retaliatory plan and receive a fair correction.'],
 ['david-king','David becomes king and establishes Jerusalem','2 Samuel 5','The tribes recognise David, who takes Jerusalem and strengthens his rule.',[
  ['Recognition rests on responsibility','The tribes recall David’s earlier service. Leadership needs evidence of care rather than a title alone.'],
  ['Success serves the people','David understands his kingdom in relation to Israel. Authority should protect those dependent on it.'],
  ['Growth still needs humility','Strength and influence increase. Review decisions more carefully when fewer people are willing to challenge you.']], 'Does greater influence make us less accountable?','Invite honest feedback about one responsibility you carry.'],
 ['ark-jerusalem','The ark comes to Jerusalem','2 Samuel 6','An initial failure precedes the ark’s later arrival and David’s celebration.',[
  ['Good intention needs right conduct','The first attempt includes a serious failure. Sincerity does not remove the need for careful obedience.'],
  ['Reverence and joy belong together','The later procession includes worship and celebration. Gratitude need not become public self-promotion.'],
  ['Contempt damages intimacy','Michal’s response introduces household conflict. Discuss differences without humiliation or dismissive speech.']], 'How do we speak about a spouse’s sincere expression?','Discuss a worship difference respectfully and without contempt.'],
 ['david-covenant','God’s covenant promise to David','2 Samuel 7','David considers building a temple, but God announces a promise concerning his house.',[
  ['A good desire still needs direction','David’s plan begins generously. An honourable intention does not make every proposed action God’s instruction.'],
  ['God’s gift exceeds David’s project','The promise concerns God’s action. Receive grace without presenting personal service as its purchase.'],
  ['David responds with gratitude','His prayer recognises mercy and God’s purpose. Let a gift produce humble thanksgiving.']], 'Where do we treat service as a claim on God?','Pray in gratitude for mercy rather than bargaining for a reward.'],
 ['bathsheba','David abuses power concerning Bathsheba and Uriah','2 Samuel 11','David takes Bathsheba and arranges Uriah’s death while concealing the wrong.',[
  ['Power increases responsibility','David uses royal authority in the encounter. The text does not blame Bathsheba for his choice.'],
  ['Concealment compounds harm','David’s attempts to hide the pregnancy lead to murder. A cover-up creates further victims.'],
  ['Public success does not excuse abuse','The ruler’s position cannot make the conduct right. Keep harmed people central when addressing a powerful person’s failure.']], 'How do we prevent power from silencing someone harmed?','Review a boundary which protects consent, honesty, and accountability.'],
 ['nathan','Nathan confronts David','2 Samuel 12:1-25; Psalm 51','Nathan exposes David’s wrongdoing, and David acknowledges his sin.',[
  ['Correction makes the wrong visible','Nathan’s account reveals David’s double standard. A person’s reputation should not prevent specific accountability.'],
  ['Confession names personal guilt','David admits his sin. Repentance stops shifting responsibility to circumstances or the person harmed.'],
  ['Mercy does not erase consequences','The chapter retains painful effects after confession. Forgiveness belongs alongside repair and care for victims.']], 'What does direct confession sound like?','Make a specific admission without explanation used as an excuse.'],
 ['absalom','Absalom’s rebellion and David’s grief','2 Samuel 15:1-14; 18:1-19:8','Absalom’s pursuit of power leads to conflict, death, and grief.',[
  ['Flattery serves a political aim','Absalom wins approval by undermining trust. Do not use selective kindness to manipulate loyalties.'],
  ['Family failure affects wider people','The rebellion harms more than the king’s household. Private conflict sometimes creates public costs.'],
  ['Grief still needs responsibility','David mourns while others await leadership. Receive support in grief while attending to necessary duties.']], 'How do we support grief without neglecting practical needs?','Arrange one practical duty for a grieving person.'],
 ['david-census','David’s census and repentance','2 Samuel 24','David orders a census, recognises guilt, and responds to judgment.',[
  ['Trusted correction deserves attention','Joab raises a concern. Listen to a serious objection rather than relying solely on authority.'],
  ['Confession follows personal examination','David recognises wrongdoing. A leader should not wait for public exposure before admitting a fault.'],
  ['Worship carries a real cost','David refuses a costless offering. Generosity needs personal participation, without copying this historical judgment.']], 'What credible objection have we dismissed?','Revisit a decision after hearing a thoughtful concern.']
]),
eventGroup('solomon','11. Solomon and the divided kingdom','OT','1 Kings 1-14. Wisdom, worship, prosperity, and the division of the kingdom are separate studies.',[
 ['solomon-throne','Solomon succeeds David','1 Kings 1-2:12','A contested succession ends with Solomon’s public installation.',[
  ['Ambition creates competing claims','Adonijah advances himself. Position should not be seized through selective alliances and exclusion.'],
  ['Truth needs responsible communication','Nathan and Bathsheba bring the matter to David. Address a serious concern with clear evidence.'],
  ['Transition requires explicit direction','David gives public instructions. Succession benefits from clear decisions rather than silence.']], 'Which responsibility needs a clearer handover?','Document a recurring task so another person is prepared to carry it.'],
 ['solomon-wisdom','Solomon asks for wisdom','1 Kings 3','Solomon requests understanding and later judges a difficult case.',[
  ['The request concerns service','Solomon asks for discernment to govern. Seek wisdom for responsibility rather than admiration.'],
  ['Listening precedes judgment','The dispute requires attention to both accounts. Avoid deciding from one person’s confident presentation alone.'],
  ['Wisdom protects the vulnerable','The decision concerns a child’s life. Evaluate judgment by whether people receive fair protection.']], 'What shared decision requires more careful listening?','Hear both accounts before deciding a disagreement.'],
 ['temple-built','Solomon builds the temple','1 Kings 5-7','Materials, labour, and skilled work contribute to the temple’s construction.',[
  ['Large projects need preparation','The account includes agreements and organisation. A generous intention still requires workable planning.'],
  ['Work involves many contributors','The visible building depends on labour and skill. Honour people whose work receives little public notice.'],
  ['A structure serves worship','The temple’s purpose concerns God’s presence and instruction. Do not make appearance the measure of faithfulness.']], 'Do we value practical workers as much as public leaders?','Thank a quiet contributor and review the fairness of a shared workload.'],
 ['temple-dedicated','Solomon dedicates the temple','1 Kings 8','The ark is brought in and Solomon prays concerning worship, judgment, and mercy.',[
  ['God exceeds the building','Solomon recognises that heaven cannot contain God. A religious place does not confine His presence.'],
  ['Prayer includes repentance','The petitions anticipate failure and a return to God. Worship should make room for honest confession.'],
  ['The concern extends to outsiders','The prayer includes the foreigner. Welcome people rather than treating worship as a private privilege.']], 'Does our worship include concern for people outside our group?','Pray for an outsider’s need and offer respectful practical care.'],
 ['queen-sheba','The queen of Sheba visits Solomon','1 Kings 10:1-13','The queen examines Solomon’s wisdom through questions and observation.',[
  ['A reputation deserves examination','The visitor asks difficult questions. Claims about wisdom need more than publicity.'],
  ['Visible order has practical effects','The queen observes administration and provision. Skill should improve the lives of people involved.'],
  ['Honour needs a faithful direction','The encounter recognises the Lord’s purpose. Admiration should not become self-exaltation.']], 'How do we check an impressive claim?','Examine evidence before repeating a public claim about someone.'],
 ['solomon-failure','Solomon’s divided allegiance','1 Kings 11:1-13','Solomon’s later relationships and worship turn his heart from faithful allegiance.',[
  ['Wisdom does not remove temptation','The earlier gift does not guarantee lasting obedience. Keep discipline even after recognised success.'],
  ['Affection affects allegiance','Solomon permits worship conflicting with God’s command. Loving a person does not require adopting every practice.'],
  ['Choices affect a later generation','The announcement concerns the kingdom’s future. Consider the legacy created by repeated compromises.']], 'What compromise have we normalised after success?','Correct one practice which conflicts with a clear biblical duty.'],
 ['kingdom-divided','Rehoboam’s decision divides the kingdom','1 Kings 12','Rehoboam rejects experienced advice and answers the people harshly.',[
  ['A complaint deserves examination','The people request relief from burdens. Leadership needs to hear actual costs.'],
  ['Pride favours flattering advice','Rehoboam chooses an answer supporting domination. Test counsel rather than choosing the voice which feeds your pride.'],
  ['Harsh speech has lasting effects','His response contributes to division. Authority does not make contempt a sound method.']], 'Whose advice challenges our pride constructively?','Receive a fair complaint and respond without intimidation.'],
 ['jeroboam-calves','Jeroboam creates alternative worship','1 Kings 12:25-33; 13:1-10','Fear of losing allegiance leads Jeroboam to establish new worship centres.',[
  ['Insecurity motivates control','Jeroboam fears the people returning to David’s house. Personal security must not determine religious truth.'],
  ['Convenience disguises compromise','He presents the arrangement as easier. Evaluate a practice by faithfulness rather than convenience alone.'],
  ['Accountability opposes the scheme','A prophetic word challenges the altar. Receive correction when a plan serves control over obedience.']], 'Where does insecurity lead us to control others?','Replace a controlling demand with an honest conversation.']
]),
eventGroup('elijah-elisha','12. Elijah and Elisha','OT','1 Kings 17 through 2 Kings 8. Related ministries share a group; each encounter remains separate.',[
 ['elijah-widow','Elijah and the widow at Zarephath','1 Kings 17:1-16','During drought, Elijah receives provision and meets a widow facing hunger.',[
  ['Dependence includes ordinary provision','Food comes through particular means. Recognise practical help instead of expecting only dramatic answers.'],
  ['Need deserves serious attention','The widow describes a life-threatening shortage. Do not shame poverty or use the account to demand reckless giving.'],
  ['The supply is a particular gift','The flour and oil continue as promised. This event does not guarantee multiplication of every household resource.']], 'How do we speak about scarcity without shaming someone?','Discuss a practical need and arrange responsible help.'],
 ['widow-son','The widow’s son is restored to life','1 Kings 17:17-24','The child becomes ill and dies, and Elijah prays for his life.',[
  ['Grief asks painful questions','The mother voices her distress. Give grief room rather than forcing silence.'],
  ['Elijah brings the loss to God','His prayer acknowledges the severity of the event. Intercession needs compassion and truthful attention.'],
  ['The restoration confirms the word','The widow recognises the message’s truth. Do not promise the same outcome after every bereavement.']], 'How do we support someone whose prayer has not received the desired outcome?','Offer presence and practical care without an unsupported promise.'],
 ['carmel'],
 ['elijah-horeb','Elijah’s exhaustion and encounter at Horeb','1 Kings 19','After Carmel, Elijah flees, receives food and rest, and encounters God at Horeb.',[
  ['Success does not remove exhaustion','Elijah’s fear follows a public victory. Attend to fatigue rather than dismissing distress as weak faith.'],
  ['Care includes bodily needs','Food and rest precede further direction. Spiritual support should include practical care.'],
  ['The commission restores perspective','God gives tasks and identifies others who remain faithful. Do not let isolation define the whole picture.']], 'What exhaustion needs practical attention?','Arrange rest and share one demanding responsibility.'],
 ['naboth','Ahab takes Naboth’s vineyard','1 Kings 21','Ahab’s desire leads to false accusation, Naboth’s death, and prophetic confrontation.',[
  ['Desire becomes abuse of power','A refusal frustrates Ahab. Another person’s boundary does not justify forcing an advantage.'],
  ['False witnesses enable injustice','Jezebel arranges a dishonest process. Never use procedure to disguise a predetermined wrong.'],
  ['God names the victim’s loss','Elijah confronts the seizure and killing. Accountability must attend to people harmed, not only the offender’s feelings.']], 'How do we respond when someone refuses our request?','Respect a legitimate boundary without manipulation.'],
 ['elijah-taken','Elijah is taken and Elisha continues','2 Kings 2:1-18','Elisha remains with Elijah through the final journey and continues his ministry afterward.',[
  ['Preparation includes faithful presence','Elisha remains attentive through the journey. Learning often involves steady participation.'],
  ['The gift concerns service','Elisha asks about continuing the prophetic responsibility. Seek capacity for work rather than status.'],
  ['Continuity needs action','Elisha returns to the people. A transition should prepare someone to carry necessary duties.']], 'How do we prepare another person to continue a responsibility?','Explain a useful task and support someone learning it.'],
 ['widow-oil','Elisha helps the indebted widow','2 Kings 4:1-7','A widow faces debt and the loss of her sons, and Elisha directs her concerning oil.',[
  ['The debt threatens people','The crisis affects the children. Discuss money with attention to people and practical consequences.'],
  ['The response uses what is present','Elisha asks what she has. Begin a plan from actual resources rather than assumed ones.'],
  ['Relief leads to responsible payment','The instruction includes paying debt and living on the remainder. Provision still needs wise administration.']], 'What actual resources help us address a financial problem?','List resources and agree on a realistic debt or expense plan.'],
 ['shunammite','The Shunammite woman and her son','2 Kings 4:8-37','Hospitality leads to an announced birth, followed later by the child’s death and restoration.',[
  ['Hospitality meets a real need','The woman prepares a place for Elisha. Generosity begins with practical attention.'],
  ['Grief refuses shallow reassurance','She seeks Elisha when the child dies. Serious distress requires more than a convenient answer.'],
  ['Restoration remains God’s gift','Elisha prays and the child lives. Receive the event as testimony without promising a repeated outcome.']], 'Does our response to grief include patient attention?','Offer concrete help to someone facing a family crisis.'],
 ['naaman','Naaman receives healing','2 Kings 5:1-19','A servant’s testimony brings Naaman to Elisha, where a simple instruction challenges his expectations.',[
  ['An overlooked voice matters','The servant points toward help. Listen to a person regardless of rank.'],
  ['Pride resists an ordinary instruction','Naaman objects to the method. Do not let status prevent receiving sensible help.'],
  ['Gratitude recognises God','Naaman returns and acknowledges the Lord. The event is not a universal medical instruction or a guarantee of healing.']], 'What expectation makes us reject useful advice?','Receive a practical correction without defending your status.'],
 ['gehazi','Gehazi takes a dishonest reward','2 Kings 5:20-27','Gehazi pursues Naaman and falsely claims a need to obtain gifts.',[
  ['Greed rewrites the explanation','Gehazi invents a story. Never manufacture a need to obtain another person’s money.'],
  ['Secrecy tries to protect the wrong','He hides the goods and denies his action. Concealment deepens the breach of trust.'],
  ['Religious service requires integrity','Elisha confronts the misuse. Association with ministry does not excuse financial dishonesty.']], 'Where does money tempt us toward a false account?','Correct a dishonest financial statement and arrange restitution.'],
 ['elisha-army','Elisha’s servant sees the surrounding army','2 Kings 6:8-23','The servant fears an opposing force, and Elisha prays for his perception to change.',[
  ['Fear sees only part of the situation','The servant notices the threat. Recognise fear without treating it as complete evidence.'],
  ['Prayer seeks clearer understanding','Elisha asks for opened eyes. Seek perspective rather than demanding a preferred outcome.'],
  ['Mercy replaces retaliation','The captured force receives food and release. Use advantage responsibly instead of humiliating an opponent.']], 'How do we use an advantage over someone?','Choose a fair response in a situation where you hold power.']
]),
eventGroup('kings-fall','13. Reform and the fall of the kingdoms','OT','2 Kings and 2 Chronicles. Reform, deliverance, pride, and exile receive distinct lessons.',[
 ['hezekiah-reform','Hezekiah restores worship','2 Chronicles 29-30','Hezekiah reopens the temple and calls the people to renewed worship.',[
  ['Renewal addresses neglected duties','The temple requires cleansing and restored service. Begin with concrete responsibilities rather than publicity.'],
  ['Invitation crosses division','The Passover invitation reaches beyond Judah. Faithful renewal need not reinforce every old boundary.'],
  ['Mercy attends to imperfect beginnings','Hezekiah prays for people not fully prepared. Help sincere learners without using a process to humiliate them.']], 'What neglected practice needs a practical restart?','Agree on a realistic routine for shared prayer and Scripture.'],
 ['sennacherib','Hezekiah faces Sennacherib’s threat','2 Kings 18:13-19:37','Assyria’s threats lead Hezekiah to seek God and receive Isaiah’s response.',[
  ['Intimidation aims at despair','The threat undermines trust and isolates the people. Separate credible facts from speech designed to frighten.'],
  ['Prayer names the actual danger','Hezekiah brings the message before God. Speak specifically instead of pretending the problem is small.'],
  ['Deliverance remains God’s work','The account describes a particular rescue. Do not promise identical outcomes for every public crisis.']], 'What threat needs clearer evaluation?','List facts, exaggerated claims, and responsible actions concerning a fear.'],
 ['hezekiah-envoys','Hezekiah displays his treasures','2 Kings 20:12-19','Hezekiah shows visiting envoys his wealth and receives a warning from Isaiah.',[
  ['Approval invites display','The visit becomes an occasion for showing possessions. Review motives behind sharing private information.'],
  ['A decision affects future people','Isaiah announces consequences beyond Hezekiah. Consider the later cost of a present display.'],
  ['Comfort is not the whole concern','Hezekiah values peace in his own days. Responsibility includes people who will inherit your choices.']], 'What future cost are we ignoring for present comfort?','Review a decision for its effect on people who follow you.'],
 ['josiah-book','Josiah responds to the discovered book','2 Kings 22-23:25','A discovered law book leads Josiah to seek understanding and initiate reform.',[
  ['Scripture exposes a gap','Josiah recognises conduct inconsistent with the law. Let the text examine habits rather than merely confirm them.'],
  ['Understanding precedes reform','He seeks a faithful explanation. Ask careful questions before applying an unfamiliar passage.'],
  ['Response changes practice','The reforms address actual worship and conduct. Conviction requires more than emotional distress.']], 'Which habit does Scripture require us to reconsider?','Read the context and make one specific correction.'],
 ['jerusalem-fall','Jerusalem falls and Judah enters exile','2 Kings 24-25; 2 Chronicles 36:11-21','Repeated unfaithfulness and political upheaval culminate in Jerusalem’s destruction.',[
  ['Warnings were repeatedly rejected','The accounts connect the fall with persistent refusal. Do not normalise a harmful pattern because consequences are delayed.'],
  ['Public failure harms ordinary people','Siege and exile affect a whole population. Keep human suffering visible when discussing leadership decisions.'],
  ['Loss does not end every future possibility','The concluding release of Jehoiachin leaves a small opening. Hope does not require denying the severity of judgment.']], 'What repeated warning needs action before harm grows?','Act on a credible concern and support someone affected by institutional failure.']
]),
eventGroup('prophets-suffering','14. Suffering and prophetic encounters','OT','Job, Isaiah, Jeremiah, Ezekiel, Jonah, and Habakkuk. Distinct narrative scenes and visions are identified clearly.',[
 ['job-loss','Job loses his possessions and children','Job 1-2','A righteous man experiences devastating loss and illness.',[
  ['Suffering is not a simple guilt measure','The opening identifies Job’s integrity. Do not infer a person’s hidden sin from their distress.'],
  ['Grief includes bodily expression','Job mourns and speaks from pain. Faith does not require an untroubled appearance.'],
  ['Presence precedes explanation','The friends initially sit in silence. Offer company before attempting an explanation.']], 'Do we rush to explain another person’s suffering?','Listen to someone in distress without assigning a cause.'],
 ['job-friends','Job’s friends offer mistaken explanations','Job 4:1-9; 8:1-7; 11:1-6; 42:7-9','The friends increasingly connect Job’s suffering with wrongdoing, and God later corrects them.',[
  ['A true principle becomes a false diagnosis','Their general claims fail to describe Job’s case. Do not apply a slogan without understanding the person’s situation.'],
  ['Certainty sometimes silences pain','The friends argue instead of listening. An explanation should not become a way of avoiding compassion.'],
  ['God corrects the speakers','The final judgment rejects their speech. Religious confidence is not the same as accuracy.']], 'Which comforting phrase risks becoming an accusation?','Replace a simplistic explanation with patient listening and practical care.'],
 ['job-answer','God answers Job','Job 38:1-42:6','God addresses Job through questions concerning creation and human limits.',[
  ['The answer widens perspective','God’s questions reveal a world beyond Job’s knowledge. Acknowledge limits instead of inventing certainty.'],
  ['Power belongs with wisdom','The descriptions show God’s authority over creation. Human control is limited even when knowledge increases.'],
  ['Humility responds honestly','Job revises his speech. Changing a conclusion is responsible when the evidence challenges it.']], 'Which claim have we made beyond what we know?','Acknowledge an unanswered question without supplying an invented explanation.'],
 ['isaiah-call','Isaiah’s vision and commission','Isaiah 6','Isaiah sees the Lord, recognises uncleanness, and receives a commission.',[
  ['Holiness exposes personal need','Isaiah first acknowledges his own lips. Correction should begin with self-examination rather than superiority.'],
  ['Cleansing precedes service','The coal scene addresses guilt. Ministry is a response to mercy, not evidence of personal perfection.'],
  ['The commission includes resistance','The message will meet hardened hearers. Faithful service does not guarantee popularity.']], 'What personal fault needs attention before correcting others?','Confess a specific fault and take a practical step toward change.'],
 ['jeremiah-call','Jeremiah receives his call','Jeremiah 1','Jeremiah objects concerning youth and receives a commission and reassurance.',[
  ['Limitation is acknowledged','Jeremiah names his difficulty. Honest weakness differs from refusing every duty.'],
  ['The message has a defined source','God gives the words. Do not present personal opinion as a direct divine statement.'],
  ['Courage faces opposition','The commission anticipates resistance. Prepare to speak truth respectfully when approval is uncertain.']], 'Where do we confuse opinion with God’s word?','Distinguish a clear biblical instruction from your own preference.'],
 ['jeremiah-cistern','Jeremiah is rescued from the cistern','Jeremiah 38:1-13','Officials place Jeremiah in a cistern, and Ebed-melech intervenes.',[
  ['Truth sometimes meets suppression','Jeremiah’s message leads to imprisonment. Do not assume powerful opposition proves a claim false.'],
  ['Protection requires a specific appeal','Ebed-melech names the danger before the king. Responsible help includes speaking clearly to someone able to act.'],
  ['Care attends to the method','Cloths protect Jeremiah during rescue. Practical details preserve dignity as well as life.']], 'Who needs someone to speak on their behalf?','Make a responsible appeal for a person facing unfair treatment.'],
 ['dry-bones','Ezekiel’s vision of the dry bones','Ezekiel 37:1-14','A vision addresses Israel’s hopelessness in exile.',[
  ['The image has an explained meaning','The text identifies the bones with Israel. Begin with that interpretation rather than applying each detail arbitrarily.'],
  ['Life comes through God’s action','Word and breath accompany restoration. Human effort is not presented as the source of renewal.'],
  ['Hope addresses a real despair','The people think their hope is lost. Encourage with the passage’s stated promise without predicting an identical personal outcome.']], 'What interpretation does the passage itself give?','Write the vision’s stated meaning before discussing a present application.'],
 ['jonah-flight','Jonah flees and prays from the fish','Jonah 1-2','Jonah refuses the commission, boards a ship, and later prays from distress.',[
  ['Avoidance affects other people','The flight puts sailors at risk. A postponed duty sometimes burdens people who did not choose the problem.'],
  ['The outsider shows moral attention','The sailors ask questions and attempt rescue. Do not dismiss concern because the speaker belongs to another group.'],
  ['Prayer returns toward dependence','Jonah prays after refusing the call. Returning to God should lead to a faithful next step.']], 'Who bears the cost of our avoidance?','Name a neglected duty and take responsibility for its effects.'],
 ['jonah-nineveh','Nineveh responds and Jonah objects','Jonah 3-4','Nineveh responds to the message, while Jonah struggles with God’s mercy.',[
  ['Response includes changed conduct','The people turn from violence. Repentance concerns action rather than ceremonial appearance alone.'],
  ['Mercy challenges resentment','Jonah dislikes the outcome. Examine whether you want another person punished more than restored.'],
  ['God’s concern extends beyond Jonah','The final question names the city’s people and animals. Care exceeds personal convenience and prejudice.']], 'Whose restoration do we find difficult to welcome?','Pray for someone you resent and choose a fair response toward them.'],
 ['habakkuk','Habakkuk questions and waits','Habakkuk 1:1-2:4; 3:17-19','Habakkuk asks about injustice and responds to God through watchful faith.',[
  ['The question concerns real injustice','The prophet names violence and delay. Honest lament is different from indifference to God.'],
  ['Waiting includes attention','He takes a watchful position. Patience means remaining attentive rather than denying uncertainty.'],
  ['Trust is not dependent on abundance','The final prayer names lost crops and animals. Faithful joy need not claim that hardship has disappeared.']], 'What injustice needs an honest prayer?','Pray specifically and identify a responsible action within your influence.']
]),
eventGroup('exile','15. Daniel and Esther in exile','OT','Daniel and Esther. Faithfulness under pressure appears in separate personal and public events.',[
 ['daniel-food','Daniel and his friends decline the royal food','Daniel 1','Young exiles enter royal training and seek an alternative diet.',[
  ['Conviction needs a clear reason','Daniel resolves not to defile himself. Do not confuse every personal preference with a moral command.'],
  ['The request remains respectful','Daniel proposes a test through the official. Conviction should not require contemptuous speech.'],
  ['Competence accompanies integrity','The account includes learning and skill. Faithfulness should strengthen responsible work rather than excuse poor effort.']], 'How do we state a conviction respectfully?','Explain a boundary calmly and propose a responsible alternative.'],
 ['daniel-dream','Daniel explains Nebuchadnezzar’s dream','Daniel 2','The king’s demand threatens the wise men, and Daniel seeks God with his friends.',[
  ['Pressure leads to shared prayer','Daniel asks his companions to seek mercy. Receive support instead of treating every crisis as solitary responsibility.'],
  ['The answer directs honour to God','Daniel denies independent superiority. A gift should produce humility.'],
  ['Earthly kingdoms are limited','The dream concerns successive powers and God’s kingdom. Hold political influence and status with perspective.']], 'Who should share our prayer about a difficult duty?','Pray together and seek reliable help for a current pressure.'],
 ['furnace'],
 ['nebuchadnezzar','Nebuchadnezzar’s humiliation and restoration','Daniel 4','The king receives a warning, speaks proudly, and later acknowledges God’s rule.',[
  ['Warning calls for moral change','Daniel urges righteousness and mercy. A warning needs practical response rather than fascination alone.'],
  ['Pride claims complete authorship','The king celebrates his own power. Acknowledge the people and provision behind achievement.'],
  ['Restoration includes acknowledgment','The king praises the Most High. Do not use the event to diagnose every mental illness as divine punishment.']], 'Who has contributed to our achievements?','Thank a contributor and correct a claim of self-sufficient success.'],
 ['belshazzar','The writing on the wall','Daniel 5','Belshazzar profanes temple vessels during a feast and receives a judgment.',[
  ['Privilege does not guarantee wisdom','The king has knowledge of an earlier warning. Learning about failure is useless when conduct ignores it.'],
  ['Sacred things become a display','The feast uses the vessels for contempt. Respect should remain practical rather than ceremonial only.'],
  ['Accountability addresses pride','Daniel explains the judgment. Position and applause do not exempt decisions from scrutiny.']], 'Which lesson from an earlier failure have we ignored?','Apply a known lesson to a present decision.'],
 ['lions','Daniel in the lions’ den','Daniel 6','Officials exploit a decree to target Daniel’s established prayer practice.',[
  ['Integrity is tested through conduct','The officials find no ordinary corruption. Reliable work supports a credible witness.'],
  ['Faithfulness precedes the crisis','Daniel continues an established practice. Regular prayer matters before an emergency.'],
  ['The rescue is particular','God preserves Daniel in this event. Obedience must not depend on a promise of physical escape in every danger.']], 'What faithful habit needs consistency before pressure arrives?','Agree on a realistic shared prayer routine.'],
 ['esther-position','Esther becomes queen and Mordecai exposes a plot','Esther 2','Esther enters the royal household, and Mordecai reports a threat against the king.',[
  ['The setting involves unequal power','The narrative describes an imperial system. Description of its arrangements does not require approval of every practice.'],
  ['Influence has responsibilities','Esther’s position creates future opportunities. Ask whose needs become your concern through a role you hold.'],
  ['Unrecognised service still matters','Mordecai’s action is recorded before reward. Serve faithfully without making immediate recognition a condition.']], 'What responsibility follows from our access or influence?','Use an available opportunity to help someone responsibly.'],
 ['esther-courage','Esther approaches the king','Esther 3-5:8','Haman’s plan threatens the Jews, and Esther chooses to speak despite risk.',[
  ['Danger requires truthful disclosure','Mordecai gives the details. A serious need must be communicated accurately.'],
  ['Position does not remove vulnerability','Esther still faces risk. Do not assume an influential person has no need of support.'],
  ['Preparation includes shared dependence','Esther calls for fasting before acting. Spiritual preparation accompanies the necessary approach.']], 'What concern needs a courageous and prepared conversation?','Prepare facts, seek support, and begin a necessary conversation.'],
 ['esther-deliverance','Haman’s plan is exposed and deliverance remembered','Esther 6-9','A chain of reversals exposes Haman and leads to the establishment of Purim.',[
  ['Hidden schemes are brought to light','Esther identifies the threat. Accountability requires a clear account of the wrong.'],
  ['Reversal does not authorise modern retaliation','The conflict belongs to this imperial setting. Do not copy violence as a response to personal hostility.'],
  ['Remembrance includes generosity','Purim includes gifts and care for the poor. Gratitude should extend beyond your own relief.']], 'How does gratitude include people still in need?','Mark a mercy received with a practical act of generosity.']
]),
eventGroup('return','16. Return, rebuilding, and renewal','OT','Ezra and Nehemiah. The return, rebuilding work, public teaching, and later reforms are distinct studies.',[
 ['cyrus-return','Cyrus permits the return','Ezra 1-2','The return begins through a royal decree and willing participation.',[
  ['A new opening needs response','The decree creates an opportunity. Preparation and action still matter when conditions improve.'],
  ['Many people contribute','The return includes varied households and gifts. Shared work should recognise different contributions.'],
  ['Restoration preserves memory','Temple vessels and family lists are recorded. Keep honest records through a major transition.']], 'What opportunity needs preparation rather than celebration alone?','List practical steps for a new beginning.'],
 ['temple-foundation','The temple foundation brings joy and tears','Ezra 3','Worship resumes and the foundation is laid, producing different reactions.',[
  ['Renewal begins before completion','Worship resumes while construction continues. Do a necessary duty without waiting for ideal conditions.'],
  ['People remember different experiences','Some rejoice while others weep. Different reactions deserve listening rather than instant judgment.'],
  ['Shared work includes gratitude','The people praise God’s mercy. Thank contributors while recognising unresolved grief.']], 'How do we make room for different responses to change?','Listen to your spouse’s experience of a recent transition.'],
 ['rebuilding-opposition','The temple work faces opposition and resumes','Ezra 4:1-5; 5-6','Opposition delays the work, while prophetic encouragement and official review help it resume.',[
  ['A delay needs accurate understanding','Opposition affects the project. Distinguish external obstacles from avoidable failures within the work.'],
  ['Encouragement returns to duty','The prophets call the people back to building. A helpful message should lead to a responsible action.'],
  ['Records support a fair review','The decree is examined. Honest documentation matters when an agreement is disputed.']], 'Which stalled responsibility needs a realistic restart?','Review the obstacle and take one workable step.'],
 ['nehemiah-wall','Nehemiah prepares and rebuilds the wall','Nehemiah 1-4','Nehemiah prays, seeks permission, inspects the damage, and organises rebuilding.',[
  ['Prayer leads to preparation','Nehemiah asks for concrete permissions and materials. Dependence includes a considered plan.'],
  ['Inspection precedes organisation','He examines the damage. Learn the actual condition before assigning work.'],
  ['Opposition requires shared vigilance','The workers adapt while continuing. Support one another without denying genuine risks.']], 'What task needs better information before action?','Inspect a practical problem and agree on responsibilities.'],
 ['nehemiah-debt','Nehemiah confronts exploitation','Nehemiah 5','Debt and interest place fellow Jews under pressure while the rebuilding continues.',[
  ['A shared project does not excuse injustice','The complaints concern actual exploitation. Do not hide harm behind the importance of a common mission.'],
  ['Correction requires restitution','Nehemiah calls for return and changed terms. An apology needs practical repair.'],
  ['Leadership limits personal advantage','He describes restraint in his own role. Apply the standard you ask others to follow.']], 'What financial arrangement places unfair pressure on someone?','Review its fairness and correct an exploitative term.'],
 ['ezra-reading','Ezra reads and explains the law','Nehemiah 8-9','Public reading, explanation, celebration, and confession shape the community’s renewal.',[
  ['Reading needs understanding','The teachers explain the meaning. Ask what the passage says before deciding how to apply it.'],
  ['Conviction includes hope','The people grieve and are directed toward joy. Correction should not become humiliation without a path forward.'],
  ['Memory leads to confession','The prayer recounts mercy and failure. Admit wrong while remembering God’s faithfulness.']], 'Do we understand a passage before applying it?','Read a paragraph together and each explain its meaning in context.']
]),
eventGroup('birth-preparation','17. The birth of Jesus and preparation for ministry','NT','Matthew 1-4 and Luke 1-4. Announcements, birth, childhood, baptism, and temptation each have their own lesson.',[
 ['zechariah','The announcement to Zechariah','Luke 1:5-25','Zechariah receives an announcement concerning John while serving in the temple.',[
  ['God meets ordinary service','The encounter comes during an assigned duty. Faithfulness includes regular responsibility rather than pursuit of unusual experiences.'],
  ['The promise exceeds expectation','Age and previous disappointment shape Zechariah’s response. Bring doubt honestly without limiting God to your preferred timetable.'],
  ['The child’s role points beyond himself','John will prepare people for the Lord. A calling concerns service rather than family prestige.']], 'How do we respond when hope challenges a long disappointment?','Pray honestly about waiting while fulfilling a present duty.'],
 ['mary-announcement','Gabriel announces Jesus’ birth to Mary','Luke 1:26-38','Mary receives an announcement concerning the child she will bear.',[
  ['The announcement centres on Jesus','The titles and promise identify His role. Do not reduce the passage to a general message about personal achievement.'],
  ['A question seeks understanding','Mary asks how the event will happen. Honest inquiry differs from refusing to listen.'],
  ['The response expresses willing service','Mary accepts her role. Faithful response needs humility rather than control over every detail.']], 'Which title in the announcement explains Jesus’ identity?','Read the announcement together and each explain one title.'],
 ['mary-elizabeth','Mary visits Elizabeth','Luke 1:39-56','The women meet, and Mary responds through praise concerning God’s mercy.',[
  ['Encouragement recognises God’s work','Elizabeth receives Mary with affirmation. Support another person without shifting attention to yourself.'],
  ['Praise remembers mercy','Mary’s song connects her experience with God’s faithfulness. Gratitude should recognise more than personal convenience.'],
  ['The song challenges status','Its reversals concern pride, wealth, and need. Examine treatment of people with less influence.']], 'How do we encourage someone without comparison?','Offer specific encouragement and practical care to another person.'],
 ['john-birth','John is born and named','Luke 1:57-80','John’s birth brings a naming decision and Zechariah’s renewed speech.',[
  ['A name follows the instruction','Elizabeth and Zechariah confirm John’s name despite expectations. Faithfulness sometimes differs from family convention.'],
  ['Praise directs attention beyond the household','Zechariah speaks about redemption. A blessing should lead to concern wider than personal success.'],
  ['Preparation becomes a life of service','John’s future role concerns repentance and the Lord’s way. Growth requires preparation, not a title alone.']], 'What expectation needs examination against a clear duty?','Discuss a family expectation calmly and identify the faithful response.'],
 ['joseph-dream','Joseph receives direction concerning Mary','Matthew 1:18-25','Joseph learns the explanation of Mary’s pregnancy and takes her as his wife.',[
  ['The initial response considers dignity','Joseph seeks to avoid public disgrace. A difficult suspicion requires restraint rather than humiliation.'],
  ['The explanation identifies Jesus','The names and promise concern salvation and God’s presence. Keep the passage’s central claim in view.'],
  ['Obedience becomes practical care','Joseph acts on the instruction. Responsibility includes protection and reliable support.']], 'How do we preserve dignity while seeking truth?','Address a concern privately and without public shaming.'],
 ['birth'],
 ['simeon-anna','Jesus is presented and recognised in the temple','Luke 2:21-38','Simeon and Anna recognise Jesus during the family’s temple visit.',[
  ['Ordinary obedience frames the encounter','The family follows the prescribed practice. Spiritual attention belongs within everyday responsibility.'],
  ['Hope concerns Jesus and many people','Simeon names salvation and light. Christian hope is specific rather than a vague positive feeling.'],
  ['The blessing includes sorrow','Simeon warns Mary of opposition and pain. God’s purpose does not exclude hardship.']], 'How do we hold hope without denying difficulty?','Pray about a hard situation with hope centred on Christ.'],
 ['magi','The magi visit Jesus','Matthew 2:1-12','Visitors seek the child while Herod’s interest conceals a threat.',[
  ['Seeking requires careful response','The visitors ask and travel. Attention should lead beyond curiosity to a responsible action.'],
  ['Public interest hides different motives','Herod speaks of worship while planning harm. Evaluate conduct rather than polite language alone.'],
  ['Worship gives honour to Jesus','The gifts accompany their response to the child. Generosity should serve worship rather than public display.']], 'How do we test the motive behind an impressive claim?','Examine actions before trusting a claim of goodwill.'],
 ['egypt-refuge','The family flees to Egypt and later returns','Matthew 2:13-23','Joseph takes Mary and Jesus away from Herod’s threat before settling in Nazareth.',[
  ['Protection requires prompt action','Joseph responds to the warning. A safety concern needs practical attention rather than delay.'],
  ['Power threatens vulnerable lives','Herod’s violence affects other families. Keep the victims visible instead of treating the episode as a travel detail.'],
  ['Return still needs wise caution','Joseph responds to further information about the rulers. Safety planning attends to changed conditions.']], 'What credible safety concern needs action?','Review a protective arrangement and make a practical improvement.'],
 ['jesus-temple','Jesus at the temple as a child','Luke 2:41-52','The family’s festival journey leads to an anxious search and a conversation in the temple.',[
  ['The parents’ distress is real','Mary names the anxiety of the search. Responsible spiritual discussion should acknowledge others’ concerns.'],
  ['Jesus’ identity shapes His response','He refers to His Father’s concerns. Read the account around His unique identity rather than ordinary defiance.'],
  ['Growth includes obedience','Jesus returns and remains subject to His parents. The narrative holds significance and ordinary growth together.']], 'How do we discuss a misunderstanding without dismissing distress?','Explain a concern calmly and listen to the other person’s account.'],
 ['baptism','Jesus is baptised by John','Matthew 3:1-17','John calls people to repentance, and Jesus receives baptism with heavenly testimony.',[
  ['The setting calls for repentance','John challenges a reliance on ancestry. Religious background does not replace changed conduct.'],
  ['Jesus’ action has a stated purpose','He speaks of fulfilling righteousness. Interpret the scene through His words rather than an invented motive.'],
  ['The testimony identifies the Son','The Spirit and voice mark Jesus’ identity. Keep attention on Him rather than treating the event as self-promotion.']], 'Where do we rely on religious background instead of conduct?','Correct a practice which contradicts a clear duty.'],
 ['temptation','Jesus resists temptation in the wilderness','Matthew 4:1-11','After baptism, Jesus faces temptations concerning provision, spectacle, and allegiance.',[
  ['Need does not justify disobedience','Hunger becomes an occasion for pressure. A real need still requires a faithful response.'],
  ['Scripture needs responsible interpretation','A quoted passage is used to encourage testing God. Read context rather than accepting a verse as automatic justification.'],
  ['Allegiance refuses a shortcut','Jesus rejects worship in exchange for power. An attractive result does not excuse a compromised loyalty.']], 'Which desired shortcut carries a moral cost?','Name a temptation and establish a practical boundary.']
]),
eventGroup('early-encounters','18. Jesus’ early ministry and encounters','NT','John 1-4, Luke 4-5, and Mark 2-3. Calls and conversations remain distinct.',[
 ['first-disciples','The first disciples follow Jesus','John 1:35-51','John’s witness leads several people to encounter and follow Jesus.',[
  ['Witness directs attention to Jesus','John does not retain every follower around himself. Faithful service recognises when attention should move beyond the messenger.'],
  ['An invitation opens a conversation','The disciples seek and meet Jesus. A respectful invitation differs from pressure.'],
  ['Recognition grows through encounter','The accounts include questions and unexpected knowledge. Allow learning instead of requiring instant complete understanding.']], 'Does our witness keep Jesus central?','Explain one truth about Jesus clearly and welcome a question.'],
 ['cana','Jesus turns water into wine at Cana','John 2:1-12','A wedding shortage becomes the setting of Jesus’ first sign in John.',[
  ['The need is noticed','Mary brings the shortage to Jesus. Care begins through attention to a practical problem.'],
  ['The servants follow an instruction','Their role involves ordinary work. Do not overlook quiet cooperation within a significant event.'],
  ['The sign reveals Jesus’ glory','John names the result as faith in Him. The account is not a guarantee of luxury for every celebration.']], 'What does John say this sign reveals?','Explain the sign’s stated purpose before discussing household needs.'],
 ['temple-cleansing','Jesus confronts commerce in the temple','John 2:13-25','Jesus challenges the misuse of the temple and speaks about His body.',[
  ['Religious activity needs examination','Commerce is challenged within a worship setting. A sacred location does not excuse exploitation.'],
  ['The explanation points to Jesus','The temple saying is interpreted through His resurrection. Read the narrator’s clarification rather than stopping at a literal misunderstanding.'],
  ['Impressed crowds need deeper understanding','John distinguishes signs from dependable knowledge of people. Popular enthusiasm is not complete discipleship.']], 'Where does religious activity obscure its purpose?','Review a practice for honesty and its actual effect on people.'],
 ['nicodemus','Jesus speaks with Nicodemus','John 3:1-21','A religious teacher questions Jesus about the kingdom and new birth.',[
  ['Status does not remove the need to learn','Nicodemus needs instruction despite his position. Ask questions without protecting a reputation for knowledge.'],
  ['New birth is God’s work','Jesus describes birth through the Spirit. Faith cannot be reduced to improved public appearance.'],
  ['Light exposes conduct','The passage connects response with deeds. Honest faith includes willingness for wrongdoing to be examined.']], 'What conduct do we prefer to keep out of scrutiny?','Bring one hidden concern into a truthful discussion.'],
 ['samaritan-woman','Jesus meets the Samaritan woman','John 4:1-42','A conversation at a well addresses living water, worship, and Jesus’ identity.',[
  ['The conversation crosses boundaries','Jesus speaks across social divisions. Treat a person with dignity rather than a stereotype.'],
  ['Truth and respect appear together','Jesus addresses her situation without reducing her to it. Honest discussion should not become humiliation.'],
  ['Witness leads others to encounter','The woman’s report brings the town. Share clearly while allowing others to examine the message.']], 'Which social boundary limits our willingness to listen?','Treat an overlooked person respectfully and hear their account.'],
 ['nazareth','Jesus is rejected at Nazareth','Luke 4:16-30','Jesus reads in the synagogue, and His explanation meets hostility.',[
  ['The passage announces a mission','Jesus speaks concerning good news and release. Keep the scriptural setting central.'],
  ['Familiarity becomes resistance','The crowd focuses on local knowledge of Him. A familiar person’s message still deserves fair examination.'],
  ['Mercy beyond the group provokes anger','The examples concern outsiders. Examine resentment when help reaches people outside your circle.']], 'Whose receiving mercy makes us uncomfortable?','Pray for someone outside your group and choose a fair action.'],
 ['fishing-call','Jesus calls the fishermen','Luke 5:1-11','A remarkable catch precedes a call to follow Jesus.',[
  ['Jesus enters ordinary work','The event begins around fishing. Spiritual responsibility belongs within daily work rather than only religious settings.'],
  ['Recognition produces humility','Peter acknowledges his sinfulness. An impressive result should not become personal boasting.'],
  ['The call redirects the life','The disciples leave to follow. Read their specific commission without assuming everyone must abandon their occupation.']], 'What responsibility does following Jesus change in our work?','Choose a truthful, fair action in your next working day.'],
 ['levi','Jesus calls Levi and eats with sinners','Mark 2:13-17','Levi follows Jesus, whose meal with others receives criticism.',[
  ['A person’s occupation is not the whole identity','Jesus calls Levi directly. Do not reduce someone permanently to a social label.'],
  ['Welcome serves a purpose','The meal is linked with Jesus’ mission to sinners. Compassion does not require pretending wrongdoing is harmless.'],
  ['Self-righteousness resists mercy','The criticism contrasts with Jesus’ answer. Examine a habit of ranking people’s worth.']], 'How do we welcome someone without denying the need for change?','Offer respectful attention to someone you have dismissed.'],
 ['sabbath-healing','Jesus heals on the Sabbath','Mark 3:1-6','A man’s need becomes the setting of a dispute over lawful conduct.',[
  ['The person must remain visible','Jesus places the man before the listeners. A debate should not erase the affected person’s need.'],
  ['The question concerns doing good','Jesus asks about help and harm. Evaluate a rule’s application through its faithful purpose.'],
  ['Hostility survives the good action','Opponents begin a plot. Do not make approval the sole measure of a responsible deed.']], 'What procedure risks overlooking a real need?','Review a rule’s application and act fairly toward the person affected.']
]),
eventGroup('miracles','19. Jesus’ signs, healings, and deliverance','NT','Each healing or sign has its own lesson. These accounts identify Jesus and never guarantee an identical outcome for every situation.',[
 ['leper','Jesus cleanses a man with leprosy','Mark 1:40-45','A man asks Jesus for cleansing and receives a specific instruction afterward.',[
  ['The approach names the need','The man requests help directly. Bring a concern honestly rather than disguising it.'],
  ['Compassion restores dignity','Jesus responds to a socially isolated person. Care should address exclusion as well as a practical problem.'],
  ['Response includes obedience','The man receives directions but spreads the news differently. Gratitude does not cancel attention to instruction.']], 'Does our care preserve the person’s dignity?','Offer respectful help to someone experiencing isolation.'],
 ['paralytic','Jesus forgives and heals the paralysed man','Mark 2:1-12','Friends bring a man through the roof, and Jesus addresses both forgiveness and bodily need.',[
  ['Faithful support becomes effort','The friends overcome the access problem. Help sometimes requires persistent practical work.'],
  ['Jesus claims authority to forgive','The controversy concerns His identity. Keep the passage’s central claim distinct from a general lesson about determination.'],
  ['Healing confirms the claim','The man rises before the witnesses. This particular sign does not make recovery a test of every person’s faith.']], 'What does this account reveal about Jesus’ authority?','Explain the forgiveness claim and offer practical support to someone with limited access.'],
 ['centurion','Jesus responds to the centurion','Matthew 8:5-13','A centurion asks concerning his servant and recognises Jesus’ authority.',[
  ['Concern crosses rank','The officer seeks help for a servant. Use status to serve people dependent on you.'],
  ['Trust recognises Jesus’ authority','The centurion describes command without demanding a particular ceremony. Faith centres on Jesus rather than a preferred method.'],
  ['The response challenges expected boundaries','Jesus praises an outsider’s faith. Avoid assuming your group owns every faithful response.']], 'How do we treat people with less authority?','Act on one need of a person whose work serves you.'],
 ['nain','Jesus restores the widow’s son at Nain','Luke 7:11-17','Jesus encounters a funeral procession and responds to a bereaved mother.',[
  ['Compassion notices grief','The widow’s loss receives attention. Recognise emotional and practical vulnerability together.'],
  ['The action reveals authority over death','The son is restored through Jesus’ command. Read the sign around His identity.'],
  ['The crowd directs praise toward God','The response names divine visitation. Do not promise the same reversal after every loss.']], 'How do we care for someone living with bereavement?','Offer practical help without prescribing their emotional response.'],
 ['storm'],
 ['gerasene','Jesus delivers the man among the tombs','Mark 5:1-20','A man living in severe distress encounters Jesus and later returns to his community.',[
  ['The distressed person has dignity','The account describes isolation and restraint. Do not treat a suffering person as spectacle.'],
  ['Restoration includes community','The man is found clothed and in his right mind. Care concerns social belonging as well as immediate relief.'],
  ['Witness recounts mercy','Jesus directs him to tell what the Lord has done. The account must not be used to diagnose every mental illness as demonic.']], 'Does our response to distress protect dignity?','Offer respectful support and encourage appropriate practical help.'],
 ['bleeding-woman','Jesus attends to the woman with long illness','Mark 5:25-34','A woman with a long history of illness approaches Jesus within a crowd.',[
  ['The suffering has a long history','The narrative includes failed treatment and expense. Avoid judging a person by a problem you have only recently noticed.'],
  ['Jesus gives personal attention','The encounter moves beyond an unnoticed touch. Dignity includes hearing the person’s account.'],
  ['The response brings peace','Jesus addresses her with care. This healing does not justify blaming someone whose illness continues.']], 'What unseen cost does a long-term illness carry?','Ask a person with a chronic need what practical help would be useful.'],
 ['jairus','Jesus restores Jairus’ daughter','Mark 5:21-24,35-43','Jairus seeks help, receives news of death, and accompanies Jesus to his home.',[
  ['A parent’s request is heard','Jairus approaches from fear for his child. Serious concern deserves patient attention.'],
  ['Jesus addresses fear amid delay','The interruption and news deepen distress. Do not interpret every delay as personal rejection.'],
  ['Care follows the extraordinary act','Jesus asks that the child receive food. Spiritual attention should include ordinary bodily needs.']], 'What ordinary care belongs alongside our prayer?','Arrange practical help for a family under pressure.'],
 ['five-thousand','Jesus feeds the five thousand','Mark 6:30-44','A large crowd receives food after Jesus teaches and directs the disciples.',[
  ['Compassion recognises the people','Jesus sees a crowd needing guidance. Do not treat numbers as more important than actual needs.'],
  ['The available resources are examined','The disciples report what they have. Begin a practical plan from honest facts.'],
  ['Provision includes orderly distribution','The food is shared and gathered. Generosity benefits from fair organisation and responsible use.']], 'How do we combine compassion with responsible planning?','List a need, available resources, and a fair way to help.'],
 ['walking-water','Jesus walks on the water','Matthew 14:22-33','The disciples face difficult conditions, and Peter responds to Jesus before becoming afraid.',[
  ['Jesus identifies Himself within fear','His words address the frightened disciples. Listen carefully rather than letting alarm decide the whole meaning.'],
  ['Peter’s action follows a specific call','The instruction is directed to Peter in this scene. Do not invent a general command to take reckless physical risks.'],
  ['The outcome leads to worship','The disciples acknowledge Jesus as God’s Son. Keep His identity central rather than celebrating daring alone.']], 'What does the final confession tell us about the event?','Read the whole scene and explain the disciples’ response.'],
 ['blind-birth','Jesus heals the man born blind','John 9','A healing leads to debate concerning guilt, testimony, and spiritual sight.',[
  ['Jesus rejects a simplistic blame','The opening challenges the assumed link between this disability and particular sin. Do not assign hidden guilt to disability.'],
  ['The man gives an honest account','He reports what he knows without pretending complete knowledge. Clear testimony distinguishes observation from inference.'],
  ['Pride resists evidence','The leaders reject the account when it challenges them. Revise a conclusion when credible evidence requires it.']], 'Do we separate what we know from what we assume?','Review a claim and distinguish observation from interpretation.'],
 ['lazarus','Jesus raises Lazarus','John 11','Jesus meets grieving sisters and calls Lazarus from the tomb.',[
  ['Grief and faith coexist','Martha and Mary speak from pain, and Jesus weeps. Trust does not require the absence of tears.'],
  ['Jesus defines the hope','He identifies Himself as resurrection and life. Christian hope rests on Him rather than an abstract wish for improvement.'],
  ['The sign reveals glory and provokes conflict','Witnesses respond differently. A remarkable event does not remove every person’s resistance or guarantee the same outcome today.']], 'How do we hold Christ-centred hope while respecting grief?','Listen patiently to a grieving person and offer practical support.'],
 ['bartimaeus','Jesus heals Bartimaeus','Mark 10:46-52','A blind beggar calls to Jesus despite efforts to silence him.',[
  ['The overlooked voice persists','Bartimaeus is told to be quiet. Do not silence a person because their need disrupts convenience.'],
  ['Jesus asks about the request','The question gives the man a voice. Ask what help a person needs instead of assuming.'],
  ['The response leads to following','Bartimaeus joins the way after receiving sight. Gratitude includes a continuing response.']], 'Whose request do we dismiss as inconvenient?','Ask an overlooked person what practical help they need.']
]),
eventGroup('teaching-encounters','20. Teaching, forgiveness, and discipleship','NT','Distinct encounters and teaching scenes. A narrated parable is labelled as a parable, rather than a historical event.',[
 ['sermon-mount','Jesus teaches on the mountain','Matthew 5-7','Jesus teaches His disciples and the gathered crowd about life under God’s rule.',[
  ['The teaching reaches inward motives','Anger, desire, and sincerity receive attention. Obedience concerns more than an acceptable public appearance.'],
  ['Prayer and generosity resist display','Jesus challenges performance for approval. Private faithfulness matters when no one applauds.'],
  ['Hearing requires practice','The concluding houses illustrate doing the teaching. Choose a concrete instruction instead of admiring the sermon only.']], 'Which instruction requires a specific change in our home?','Choose one instruction and agree on its practical application.'],
 ['forgiven-woman','Jesus receives the woman at Simon’s meal','Luke 7:36-50','A woman’s response to Jesus becomes the setting for a lesson about forgiveness and love.',[
  ['Social contempt misses the person','Simon judges the woman through her reputation. Do not reduce a person to an earlier wrong.'],
  ['Jesus connects love with mercy','The debt illustration explains gratitude. Forgiveness should lead to a loving response rather than superiority.'],
  ['Faith receives peace','Jesus addresses the woman directly. Respectful welcome includes her dignity rather than merely winning the host’s argument.']], 'Does receiving mercy make us more generous toward others?','Offer a respectful response to someone you have judged harshly.'],
 ['mary-martha','Jesus visits Martha and Mary','Luke 10:38-42','Martha’s service and Mary’s listening lead to a conversation about distraction.',[
  ['Service is affected by anxiety','Martha is burdened by many tasks. Discuss workload before resentment becomes accusation.'],
  ['Listening receives attention','Mary’s place is affirmed. Both spouses need space for learning, not only practical work.'],
  ['Priorities require examination','Jesus names the distraction. Shared devotion needs a manageable arrangement of duties.']], 'Does our workload leave either spouse without time to listen?','Redistribute a task and set a brief shared study time.'],
 ['prayer-teaching','The disciples ask Jesus to teach prayer','Luke 11:1-13','A request leads to instruction about prayer and the Father’s generosity.',[
  ['Learning begins with a request','The disciples ask for guidance. Spiritual growth includes admitting a need to learn.'],
  ['Prayer names daily dependence','The teaching includes provision, forgiveness, and protection. Bring actual needs rather than speaking only in general terms.'],
  ['The Father’s goodness guides trust','The final comparison concerns His gift. Persistence is not a method for controlling God.']], 'What need should we bring to God together?','Pray in simple words about provision, forgiveness, and guidance.'],
 ['peter-confession','Peter confesses Jesus as the Messiah','Matthew 16:13-28','Jesus asks about His identity, and Peter later resists the announcement of suffering.',[
  ['A confession needs a clear object','Peter identifies Jesus. Explain whom you trust rather than making faith a vague confidence.'],
  ['Correct words do not finish understanding','Peter objects to the suffering ahead. A true statement still needs learning about its meaning.'],
  ['Discipleship has a cost','Jesus speaks about self-denial. Following Him must shape actual choices.']], 'What do we resist in Jesus’ teaching after affirming His identity?','Choose a duty requiring self-denial and carry it responsibly.'],
 ['transfiguration','Jesus is transfigured','Luke 9:28-36','Peter, John, and James witness Jesus’ glory while Moses and Elijah appear.',[
  ['The discussion includes His departure','The glory scene still concerns the path toward Jerusalem. Do not separate honour from Jesus’ coming suffering.'],
  ['A striking sight needs listening','The voice directs attention to the Son. Spiritual significance requires attention to His words.'],
  ['The experience is not a permanent retreat','The disciples return from the mountain. A meaningful moment should support faithful life afterward.']], 'Does a spiritual experience lead to better listening?','Read one teaching of Jesus and agree on a practical response.'],
 ['rich-ruler','The rich ruler asks about eternal life','Mark 10:17-31','A wealthy man asks Jesus a serious question but struggles with the response.',[
  ['The question receives personal attention','Jesus looks at him with love. Correction need not begin with contempt.'],
  ['Possessions reveal an allegiance','The required response exposes the hold of wealth. Examine what you refuse to release for a clear duty.'],
  ['Salvation is not a human achievement','Jesus speaks of God’s possibility. Do not treat sacrifice as a purchase of acceptance.']], 'What possession or status holds our allegiance?','Review spending and choose a responsible act of generosity.'],
 ['children-welcome','Jesus welcomes the children','Mark 10:13-16','The disciples hinder children, and Jesus corrects their response.',[
  ['Access should not depend on status','The children are brought and refused. Do not measure a person’s worth by influence or productivity.'],
  ['Jesus corrects exclusion','His response gives the children attention. Authority should remove unfair barriers.'],
  ['Reception involves dependence','The kingdom saying challenges self-sufficiency. Humility receives rather than claims an earned position.']], 'What barrier do we place before someone with little influence?','Give patient attention to a person usually overlooked.'],
 ['zacchaeus','Jesus meets Zacchaeus','Luke 19:1-10','Zacchaeus seeks to see Jesus and later announces generosity and restitution.',[
  ['Welcome challenges a social label','Jesus addresses Zacchaeus directly. A person’s reputation should not prevent a truthful encounter.'],
  ['Response includes financial repair','Zacchaeus names restitution. Repentance concerns money and practical consequences.'],
  ['The mission concerns the lost','Jesus explains His purpose. Keep salvation central rather than reducing the account to curiosity.']], 'What practical repair should follow a changed attitude?','Correct an unfair financial dealing or fulfil an unpaid obligation.']
]),
eventGroup('final-week','21. Jerusalem and the final week','NT','The entry into Jerusalem, final teaching, meal, betrayal, and trials each remain distinct lessons.',[
 ['jerusalem-entry','Jesus enters Jerusalem','Luke 19:28-44','Jesus enters the city amid praise and later weeps over it.',[
  ['The entry identifies a king','The procession concerns Jesus’ identity and mission. Keep its meaning distinct from generic praise of public success.'],
  ['Acclaim differs from understanding','The welcome does not remove later opposition. Popularity is not reliable evidence of lasting allegiance.'],
  ['Jesus sees the city’s sorrow','His tears attend to coming loss. Compassion should remain visible alongside celebration.']], 'Does public approval dominate our judgment?','Review a decision without using popularity as its main measure.'],
 ['widow-gift','Jesus notices the widow’s gift','Mark 12:38-44','Jesus contrasts religious display with a poor widow’s small contribution.',[
  ['Status sometimes conceals exploitation','The preceding warning names harm to widows. Read the gift alongside concern for vulnerable people.'],
  ['Amount is not the whole measure','Jesus notices the cost to the giver. Avoid ranking generosity by visible sums alone.'],
  ['The account must not pressure the poor','The widow’s vulnerability matters. Never use this scene to demand money needed for someone’s basic care.']], 'Does our view of giving protect vulnerable people?','Choose a generous act within responsible provision for your household.'],
 ['bethany-anointing','Jesus is anointed at Bethany','Mark 14:1-11','A woman anoints Jesus while observers object to the cost.',[
  ['The action has a particular setting','Jesus relates the anointing to burial. Do not detach the gift from His approaching death.'],
  ['Criticism needs truthful motives','The observers argue about waste. Examine whether a public concern masks personal hostility.'],
  ['Jesus honours the woman’s response','He defends her action and its remembrance. Do not dismiss a person’s faithful contribution through social contempt.']], 'What context changes our judgment of another person’s action?','Ask for understanding before criticising a sincere contribution.'],
 ['foot-washing','Jesus washes the disciples’ feet','John 13:1-17','Jesus takes the servant’s role during the meal with His disciples.',[
  ['Authority chooses humble service','Jesus acts with awareness of His identity. A responsible role does not excuse refusal of ordinary work.'],
  ['Receiving care requires humility','Peter initially resists. Allow appropriate help instead of insisting on self-sufficiency.'],
  ['The example calls for action','Jesus directs the disciples toward service. Humility needs a practical expression.']], 'Which task do we avoid because we think our spouse should do it?','Take responsibility for a task which eases your spouse’s burden.'],
 ['supper','The Lord’s Supper','Luke 22:7-23; 1 Corinthians 11:23-29','Jesus shares the Passover meal and speaks about His body and blood.',[
  ['The meal centres on Jesus’ coming death','The bread and cup point to His self-giving. Keep Christ’s sacrifice central rather than reducing the event to ceremony.'],
  ['Remembrance shapes the present','The instruction directs continued remembrance. Gratitude should affect honesty and treatment of others.'],
  ['Participation requires serious examination','Paul later addresses the community’s conduct. A ritual cannot replace responsibility for harming fellow believers.']], 'How should remembrance of Christ affect our conduct?','Discuss a wrong needing confession or repair before your next shared worship.'],
 ['farewell','Jesus comforts and instructs the disciples','John 14-17','Jesus speaks about His departure, the Spirit, abiding, love, and the disciples’ future.',[
  ['Hope has a personal centre','Jesus directs trust toward Himself and the Father. Christian comfort is specific rather than an undefined optimism.'],
  ['Abiding leads to fruit','The vine teaching connects dependence with love and obedience. Spiritual language should lead to conduct.'],
  ['The prayer concerns a shared witness','Jesus prays for unity and faithfulness. Cooperation requires truth rather than silence about harm.']], 'Which command in these chapters needs practice in our home?','Read one paragraph and agree on a specific act of love.'],
 ['gethsemane','Jesus prays in Gethsemane','Mark 14:32-42','Jesus expresses anguish and prays while the disciples struggle to remain awake.',[
  ['The anguish is openly acknowledged','Jesus names deep distress. Faith does not require concealment of suffering.'],
  ['Prayer submits the desired outcome','Jesus brings the request while yielding to the Father. Dependence is not an attempt to control the answer.'],
  ['Watchfulness recognises weakness','The disciples receive a warning about temptation. Establish practical support instead of relying on intention alone.']], 'How do we pray honestly about an outcome we fear?','Pray plainly and identify support needed during a difficult duty.'],
 ['arrest','Jesus is betrayed and arrested','Luke 22:47-53','Judas identifies Jesus to the arresting group, and a disciple reacts with violence.',[
  ['A familiar gesture conceals betrayal','The kiss becomes an instrument of harm. Trust requires integrity beneath appearances.'],
  ['Zeal does not justify violence','Jesus stops the violent response and heals the injured man. Do not use loyalty as a reason for attacking someone.'],
  ['The arrest reveals misuse of power','The setting exposes a hidden approach. Fair process matters when authority acts against someone.']], 'What does a loyal response require when anger rises?','Choose a truthful and non-retaliatory response to an offence.'],
 ['peter-denial','Peter denies knowing Jesus','Luke 22:54-62','Under pressure, Peter repeatedly denies association with Jesus.',[
  ['Confidence does not remove vulnerability','Peter’s earlier resolve meets fear. Know the conditions in which your judgment weakens.'],
  ['Small denials develop into a pattern','The responses grow through repeated pressure. Correct a false statement before maintaining it requires another.'],
  ['Recognition leads to grief','Peter remembers and weeps. Acknowledgment should lead toward repentance rather than permanent self-condemnation.']], 'Which fear tempts us to deny a clear conviction?','Identify the pressure and plan a truthful response.'],
 ['trial','Jesus before the council and Pilate','Luke 22:63-23:25','Religious and political proceedings lead to Jesus’ sentence despite acknowledged concerns.',[
  ['Mockery undermines justice','Abuse precedes and surrounds the proceedings. A formal process does not become fair merely because officials conduct it.'],
  ['Pressure affects public judgment','Pilate yields to the demand. Do not let a loud group replace evidence and responsibility.'],
  ['An innocent person bears the result','The account keeps Jesus’ condemnation visible. Defend fair treatment even when doing so risks approval.']], 'How do we resist pressure to support an unfair judgment?','Examine evidence before joining a public accusation.'],
 ['cross'],
 ['burial','Joseph of Arimathea buries Jesus','Luke 23:50-56; John 19:38-42','Joseph and Nicodemus arrange burial, while the women observe and prepare.',[
  ['Conviction becomes a public action','Joseph asks for the body. Faithfulness sometimes requires stepping beyond a private sympathy.'],
  ['Care honours the body','The burial receives practical attention. Dignity remains important during death and grief.'],
  ['The witnesses attend to details','The women observe the place. Careful memory distinguishes testimony from an assumed account.']], 'What practical duty expresses respect during grief?','Offer a specific act of care to a bereaved household.']
]),
eventGroup('resurrection','22. The risen Jesus and the ascension','NT','Resurrection accounts remain separate encounters. Parallel Gospel details are read in their own settings.',[
 ['resurrection','The women discover the empty tomb','Luke 24:1-12','The women visit the tomb and receive an announcement that Jesus has risen.',[
  ['Expectation is challenged by the scene','They arrive with burial spices. Read their surprise rather than treating resurrection as an anticipated routine.'],
  ['The message recalls Jesus’ words','The women are directed to remember His teaching. Hope rests on His person and promise.'],
  ['The report requires attention','The apostles initially resist the women’s account. Do not dismiss a witness because of social status.']], 'Which words are the women directed to remember?','Read the earlier prediction and explain its connection to the announcement.'],
 ['mary-risen','The risen Jesus meets Mary Magdalene','John 20:1-18','Mary’s grief and search lead to recognition of Jesus and a message for the disciples.',[
  ['Grief affects understanding','Mary interprets the empty tomb through loss. Listen patiently when distress shapes a person’s conclusions.'],
  ['Recognition is personal','Jesus calls Mary by name. The account concerns the risen person rather than an inspiring memory.'],
  ['The encounter leads to witness','Mary carries the message. Gratitude includes communicating clearly what the passage says.']], 'How does this encounter move from grief toward witness?','Explain the scene in your own words without adding imagined details.'],
 ['emmaus','Jesus walks with the disciples to Emmaus','Luke 24:13-35','Two discouraged disciples speak with Jesus before recognising Him.',[
  ['Jesus hears their disappointed account','They explain their lost expectation. Begin by listening rather than correcting before understanding.'],
  ['Scripture provides the explanation','Jesus connects suffering and glory with Moses and the Prophets. Read verses within the larger biblical account.'],
  ['Recognition leads back to the community','They return with news. Understanding should strengthen shared witness rather than private superiority.']], 'Which passage needs reading within the wider biblical account?','Read its surrounding chapter and discuss the actual argument.'],
 ['risen-room','Jesus appears to the gathered disciples','Luke 24:36-49','Jesus addresses fear, demonstrates His bodily presence, and explains the Scriptures.',[
  ['Fear receives a patient response','Jesus speaks peace and addresses their doubts. Honest questions deserve attention.'],
  ['The resurrection is bodily','The account includes wounds and food. Luke presents more than the survival of an idea.'],
  ['Understanding leads to a commission','Repentance and forgiveness are to be proclaimed. Hope creates responsibility to witness.']], 'What details explain the kind of resurrection Luke describes?','Each explain the passage’s central claims clearly.'],
 ['thomas','Jesus meets Thomas','John 20:24-31','Thomas hears the witnesses, then encounters Jesus with the others.',[
  ['The doubt is stated openly','Thomas names his demand for evidence. An honest question differs from pretending complete understanding.'],
  ['Jesus addresses the stated concern','The encounter leads to Thomas’ confession. Keep attention on Jesus’ identity.'],
  ['The written account has a purpose','John explains why the signs are recorded. Faith is related to testimony rather than an undefined positive attitude.']], 'What confession does Thomas make?','Read John’s purpose statement and explain how the account serves it.'],
 ['peter-restored','Jesus restores Peter by the lake','John 21','A meal and repeated questions lead to a renewed responsibility for Peter.',[
  ['The meal gives space for encounter','Jesus provides food before the conversation. Care and correction need not be separated.'],
  ['Love leads to responsibility','Peter receives a charge to care for others. A renewed relationship should produce service rather than title-seeking.'],
  ['Comparison distracts from obedience','Peter asks about another disciple. Attend to your own duty instead of measuring another person’s path.']], 'Where does comparison distract us from our responsibility?','Choose a duty of care and fulfil it without comparison.'],
 ['commission','Jesus commissions the disciples','Matthew 28:16-20','The risen Jesus gives a commission concerning discipleship among the nations.',[
  ['Authority belongs to Jesus','The command begins with His authority. Witness is accountable to Him rather than personal power.'],
  ['Discipleship includes teaching obedience','The mission concerns learning and practice, not a number alone. Help a person understand and respond.'],
  ['The promise supports the duty','Jesus promises His presence. Confidence should lead to faithful service rather than complacency.']], 'How do we help someone learn rather than merely count a response?','Explain a teaching of Jesus patiently and invite a thoughtful question.'],
 ['ascension','Jesus ascends and the disciples wait','Acts 1:1-14','Jesus directs His followers concerning the Spirit and witness before His ascension.',[
  ['The question receives a boundary','Jesus distinguishes the Father’s timing from their responsibility. Avoid speculative dates beyond the text.'],
  ['The promise serves witness','The Spirit’s coming is linked with testimony. Spiritual power should serve communication and faithful conduct.'],
  ['Waiting becomes shared prayer','The followers gather together. Preparation needs a definite practice rather than passive expectation.']], 'What responsibility is clearer than the timing we want to know?','Pray together and act on a present duty rather than speculate about dates.']
]),
eventGroup('early-church','23. The first believers and their shared life','NT','Acts 1-12. The Spirit’s coming, growth, conflict, service, and suffering are distinct studies.',[
 ['matthias','Matthias is chosen','Acts 1:15-26','The community addresses the vacant apostolic role before Pentecost.',[
  ['The need has defined criteria','Peter describes the witness required. Selection should attend to the actual responsibility.'],
  ['The community seeks God','Prayer accompanies the decision. Spiritual language should not replace a transparent process.'],
  ['The method belongs to this setting','The use of lots occurs within a specific transitional scene. It is not a universal requirement for every decision.']], 'What criteria should guide a shared choice?','State the responsibility and relevant criteria before choosing someone.'],
 ['pentecost'],
 ['community','The believers share worship and resources','Acts 2:42-47; 4:32-37','The new community develops patterns of teaching, prayer, fellowship, and material care.',[
  ['Faith develops regular habits','Teaching and prayer shape the shared life. Extraordinary experiences do not replace steady attention.'],
  ['Generosity responds to needs','Resources are used for people lacking essentials. Giving should serve a real need rather than display.'],
  ['Unity has practical expression','The descriptions join belief with conduct. Agreement needs generosity and accountable care.']], 'Which regular practice needs attention in our shared life?','Set a manageable Scripture time and one specific act of generosity.'],
 ['beautiful-gate','The man at the temple gate receives healing','Acts 3','Peter and John meet a man asking for help and explain the resulting sign.',[
  ['Attention recognises the person','The apostles address him directly. Care begins by noticing rather than passing a label.'],
  ['The explanation centres on Jesus','Peter rejects personal power as the cause. Do not use an impressive outcome to elevate yourself.'],
  ['The message calls for repentance','The sign leads to a clear proclamation. Keep the announced gospel connected with the event.']], 'Where do we take credit beyond our actual contribution?','Acknowledge help honestly and explain the passage’s focus on Jesus.'],
 ['apostles-threat','The apostles respond to threats','Acts 4:1-31','Authorities question Peter and John, and the believers pray after their release.',[
  ['Witness names its basis','Peter speaks about Jesus and the resurrection. A conviction needs clear content rather than noise alone.'],
  ['The response distinguishes authority and duty','The apostles explain their obligation. A refusal requires a moral reason rather than mere personal preference.'],
  ['Prayer asks for faithful speech','The community seeks boldness. Courage should support truth without contempt or violence.']], 'What conviction requires a respectful explanation?','Prepare a clear, calm statement of a moral boundary.'],
 ['ananias-sapphira','Ananias and Sapphira misrepresent their gift','Acts 5:1-11','A couple presents a dishonest account of their contribution.',[
  ['The property was not automatically required','Peter identifies their freedom over it. The wrong concerns deception, not failure to give every possession.'],
  ['Shared agreement still needs truth','The couple cooperates in a false account. A joint decision does not make dishonesty acceptable.'],
  ['Integrity matters within worship','The severe judgment belongs to this event. It must never become a threat used to coerce donations.']], 'Do we present our generosity more favourably than the facts?','Correct a misleading claim about money or contribution.'],
 ['seven','Seven servants are appointed','Acts 6:1-7','A complaint about neglected widows leads to a practical response.',[
  ['A complaint reveals an unequal outcome','Some widows are overlooked. Shared faith does not remove the need to examine distribution fairly.'],
  ['Roles are clarified','The response defines responsibilities and selects capable people. Good intentions need workable arrangements.'],
  ['Practical service supports the mission','Food distribution matters alongside teaching. Honour quiet administrative work.']], 'Who receives less attention through our current arrangements?','Review a shared system and correct an unequal outcome.'],
 ['stephen','Stephen witnesses and is killed','Acts 6:8-7:60','False accusations lead to Stephen’s testimony and death.',[
  ['Accusation needs honest examination','The process includes false witnesses. Repetition does not turn an allegation into reliable evidence.'],
  ['The testimony reads a connected history','Stephen recalls Israel’s response to God’s messengers. Interpret scenes within the larger account.'],
  ['Prayer refuses personal revenge','Stephen prays for his killers. This does not remove the responsibility to protect threatened people.']], 'How do we respond to hostility without spreading retaliation?','Refuse an unfair accusation and act to protect someone threatened.'],
 ['ethiopian','Philip explains Scripture to the Ethiopian official','Acts 8:26-40','A traveller’s reading becomes a conversation about Isaiah and Jesus.',[
  ['A question opens learning','Philip asks whether the man understands. Respectful teaching begins through attention rather than assumptions.'],
  ['The explanation starts from the text','Philip connects the passage with Jesus. Avoid importing an unrelated message into a convenient verse.'],
  ['The response includes commitment','The official receives baptism. Understanding should lead to a considered response.']], 'Do we understand the passage we are using?','Read a paragraph and identify how its meaning connects with Jesus.'],
 ['saul-conversion','Saul encounters Jesus and receives help','Acts 9:1-31','Saul’s persecution is interrupted, and Ananias receives an instruction to visit him.',[
  ['Zeal is not proof of truth','Saul believes his violent mission is right. Strong conviction still needs moral and biblical examination.'],
  ['Grace requires a changed direction','The encounter redirects Saul’s life. Mercy should not leave harmful conduct unchanged.'],
  ['Restoration involves another person’s courage','Ananias visits despite fear. Help responsibly without pretending the former threat was harmless.']], 'Which conviction needs examination against its actual effects?','Review a strongly held approach and correct any harm.'],
 ['cornelius','Peter visits Cornelius','Acts 10-11:18','Peter’s vision prepares him for a Gentile household, where he announces Jesus.',[
  ['The vision challenges exclusion','Peter learns not to call people unclean. Dignity must not depend on social or ethnic identity.'],
  ['The message centres on Jesus','Peter recounts His ministry, death, and resurrection. Keep the gospel clear while crossing boundaries.'],
  ['The community receives an explanation','Peter later describes what happened. Shared learning needs evidence and accountable conversation.']], 'Which group do we approach through an unfair assumption?','Listen respectfully to someone outside your usual circle.'],
 ['peter-prison','Peter is released from prison','Acts 12:1-19','After James is killed, Peter is imprisoned and the believers pray.',[
  ['Different outcomes appear in one chapter','James dies while Peter is released. Do not promise escape as a universal measure of faith.'],
  ['Prayer accompanies uncertainty','The community gathers while Peter remains confined. Dependence does not require knowledge of the outcome.'],
  ['Surprise exposes limited expectation','The believers struggle to accept the news. Receive credible evidence even when it exceeds your assumptions.']], 'How does James’ death affect our reading of Peter’s release?','Pray for someone in danger without promising a particular result.']
]),
eventGroup('mission','24. Paul and the spread of the gospel','NT','Acts 13-28. Journeys, disagreements, new communities, trials, and shipwreck remain separate events.',[
 ['antioch-sending','The church at Antioch sends Barnabas and Saul','Acts 13:1-12','Prayer and worship precede the sending of workers and an encounter on Cyprus.',[
  ['The community participates','The sending involves recognised leaders and shared prayer. Service should not depend on personal ambition alone.'],
  ['Calling becomes practical movement','The workers begin the journey. A commitment needs preparation and action.'],
  ['The message faces competing influence','The Cyprus encounter includes opposition. Keep integrity while responding to resistance.']], 'What shared responsibility needs practical preparation?','Agree on a duty, necessary resources, and a first step.'],
 ['lystra','Paul and Barnabas reject worship at Lystra','Acts 14:8-20','A healing leads the crowd to mistake the workers for gods.',[
  ['An impressive event is misinterpreted','The crowd draws a wrong conclusion. Public enthusiasm needs accurate explanation.'],
  ['The workers refuse personal worship','They direct attention toward God. Do not accept honour based on a misleading claim.'],
  ['Applause changes quickly','The later attack follows the earlier excitement. Popular response is an unstable measure of faithfulness.']], 'What praise should we correct because its basis is false?','Clarify your actual contribution and credit others honestly.'],
 ['jerusalem-council','The Jerusalem council considers Gentile believers','Acts 15:1-35','A dispute about requirements leads to testimony, Scripture discussion, and a communicated decision.',[
  ['A disagreement needs careful process','The parties discuss the matter openly. Difficult questions deserve more than a unilateral demand.'],
  ['Evidence and Scripture are considered','The speakers recount events and refer to the prophets. Evaluate claims through both accurate facts and context.'],
  ['The decision is explained clearly','A letter communicates the result. An agreement needs understandable terms for the people affected.']], 'How do we reach a decision without silencing a concern?','Discuss evidence and communicate the agreed terms clearly.'],
 ['paul-barnabas','Paul and Barnabas disagree about Mark','Acts 15:36-41; 2 Timothy 4:11','A sharp disagreement separates the workers, while a later letter recognises Mark’s usefulness.',[
  ['Faithful people still disagree','The account does not erase the conflict. Difference should not become a claim that every opponent lacks faith.'],
  ['The issue concerns a practical responsibility','Mark’s earlier departure affects trust. Discuss actual reliability rather than attacking a person’s worth.'],
  ['Later usefulness allows a revised judgment','Paul later asks for Mark. Do not make an earlier failure a permanent identity.']], 'What evidence would help rebuild trust after a failure?','Define a fair next responsibility and review it through actual conduct.'],
 ['lydia','Lydia receives the message and offers hospitality','Acts 16:6-15','Paul meets a prayer gathering, and Lydia welcomes the workers.',[
  ['The route includes redirected plans','The workers reach Macedonia after limits elsewhere. A changed plan requires attention rather than automatic despair.'],
  ['The message reaches a working woman','Lydia’s business identity does not obscure her response. Give each person fair attention.'],
  ['Hospitality supports the work','Her home becomes a practical resource. Service includes ordinary space and provision.']], 'What resource do we hold which might serve a real need?','Offer responsible hospitality or practical support within your capacity.'],
 ['philippi-prison','Paul and Silas in the Philippian prison','Acts 16:16-40','Deliverance of a exploited girl precedes imprisonment, an earthquake, and a jailer’s response.',[
  ['Profit resists the end of exploitation','The owners react when their gain is threatened. Money must not justify another person’s bondage.'],
  ['The prisoners protect the jailer','Paul stops him from harming himself. Compassion remains important during personal injustice.'],
  ['Faith includes care and accountability','The jailer tends wounds, and Paul names the unlawful treatment. Mercy does not require concealing abuse.']], 'How do we combine compassion with accountability?','Support a person in distress and address a wrong through a responsible process.'],
 ['berea','The Bereans examine the Scriptures','Acts 17:10-15','The listeners receive the message and examine Scripture daily.',[
  ['Openness does not remove examination','They welcome the teaching while checking it. A respectful question is part of learning.'],
  ['The check requires regular attention','They examine the text daily. Sound judgment grows through a habit rather than a single impression.'],
  ['A speaker’s reputation is insufficient','Even Paul’s message is checked. Evaluate teaching through its actual biblical support.']], 'How do we verify a teaching without relying on the speaker’s status?','Read the cited chapter and compare the claim with its context.'],
 ['athens','Paul speaks in Athens','Acts 17:16-34','Paul addresses a city’s worship and speaks at the Areopagus.',[
  ['The speech notices the setting','Paul refers to observed worship. Understand people before addressing their questions.'],
  ['A connection serves a clear message','He speaks of the Creator and human accountability. Respectful engagement does not require concealing the central claim.'],
  ['The resurrection receives mixed responses','Some mock, others inquire, and some believe. A varied response does not make clear witness pointless.']], 'How do we explain faith clearly to someone with a different background?','Prepare a simple explanation and welcome an honest question.'],
 ['priscilla-apollos','Priscilla and Aquila help Apollos','Acts 18:1-4,24-28','The couple hears Apollos and explains the way of God more accurately.',[
  ['Competence still needs learning','Apollos is knowledgeable yet incomplete in understanding. Skill does not eliminate the need for correction.'],
  ['The correction protects dignity','The couple takes him aside. Improve understanding without unnecessary public humiliation.'],
  ['Shared service strengthens others','Both spouses contribute. Make room for each other’s ability in helping another person.']], 'How do we correct someone without humiliating them?','Offer a private, specific explanation supported by the passage.'],
 ['ephesus','The gospel disrupts profitable practices at Ephesus','Acts 19','Conversions and abandoned practices create conflict around the city’s trade and worship.',[
  ['Jesus’ name is not a formula','The attempted misuse exposes a magical approach. Do not turn prayer into a technique of control.'],
  ['Repentance changes costly habits','Believers abandon their former practices. A new conviction needs practical consequences.'],
  ['Profit motivates public resistance','Trade interests fuel the riot. Examine economic motives behind a moral argument.']], 'What costly habit needs to change with our conviction?','Stop a practice which contradicts a clear duty and plan a responsible alternative.'],
 ['eutychus','Eutychus falls and is restored','Acts 20:7-12','A gathering is interrupted when a young man falls from a window.',[
  ['Physical conditions matter','The late hour and setting are described. Organise gatherings with attention to fatigue and safety.'],
  ['The interruption receives immediate care','Paul goes down to the young man. A person’s welfare takes priority over continuing the programme.'],
  ['The community receives comfort','The account ends with the young man alive. Receive this event without making it a guarantee in every accident.']], 'What safety or fatigue issue needs practical attention?','Improve one physical arrangement affecting a gathering or household task.'],
 ['elders-farewell','Paul speaks to the Ephesian elders','Acts 20:17-38','Paul reviews his service and warns the elders concerning care and danger.',[
  ['Leadership teaches through conduct','Paul describes work, tears, and restraint. A credible example includes visible responsibility.'],
  ['Care requires vigilance','The elders receive a warning about harmful influences. Protection needs attention rather than complacency.'],
  ['Generosity opposes exploitation','Paul points to helping the weak. Service must not become a means of extracting advantage.']], 'Who needs protection or practical care within our influence?','Identify one person at risk of being overlooked and arrange support.'],
 ['paul-trials','Paul gives his defence before rulers','Acts 24-26','Paul speaks about his conduct and faith during extended legal proceedings.',[
  ['A defence distinguishes fact and accusation','Paul answers specific claims. Explain honestly without inventing a favourable account.'],
  ['Delay exposes improper motives','Felix’s expectation of money affects the process. Refuse corruption even when progress is slow.'],
  ['Witness remains clear','Paul speaks about Jesus and resurrection. Integrity and a clear message belong together.']], 'What pressure might tempt us to alter an honest account?','State the facts accurately and refuse an unfair advantage.'],
 ['shipwreck','Paul’s voyage and shipwreck','Acts 27','A dangerous voyage leads to a storm, practical decisions, and survival after shipwreck.',[
  ['A warning deserves evaluation','Early advice is dismissed. Consider credible risk even when delay is inconvenient.'],
  ['Hope includes practical instruction','Paul encourages the group and addresses food and the boat. Prayer does not cancel necessary safety measures.'],
  ['Care refuses abandonment','Paul intervenes concerning escape and later the prisoners. Protect vulnerable people when pressure rises.']], 'Which practical safety measure belongs alongside our prayer?','Review a risk and agree on a responsible precaution.'],
 ['malta-rome','Paul on Malta and in Rome','Acts 28','After the shipwreck, Paul receives hospitality and later continues witness in Rome.',[
  ['Hospitality meets an immediate need','The islanders provide warmth and help. Compassion begins through practical attention.'],
  ['Quick judgments change too easily','The crowd shifts its account after the snake incident. Do not diagnose moral guilt from an unexpected event.'],
  ['Constraint does not end every duty','Paul teaches while under guard. Identify useful service within a limited situation.']], 'What useful responsibility remains within our current limits?','Choose a practical act of care possible with present resources.']
]),
eventGroup('letters','25. Community situations reported in the letters','NT','These are situations described in New Testament letters, rather than a newly invented continuation of Acts.',[
 ['antioch-peter','Paul challenges Peter’s withdrawal at Antioch','Galatians 2:11-21','Paul reports a conflict over Peter’s treatment of Gentile believers.',[
  ['Fear changes conduct','Peter withdraws under social pressure. Examine whether approval makes you treat someone unfairly.'],
  ['The example influences others','Other believers follow the behaviour. Your practice sometimes teaches more forcefully than your words.'],
  ['The correction concerns the gospel','Paul relates the issue to justification in Christ. Equal welcome needs a clear theological basis, not convenience alone.']], 'Do we change our treatment of people when influential observers arrive?','Correct an unequal practice and explain the reason honestly.'],
 ['corinth-meal','The Corinthians misuse the Lord’s Supper','1 Corinthians 11:17-34','Paul reports division and neglect during the community’s meal.',[
  ['A gathering becomes harmful','Some eat abundantly while others lack food. A religious meeting still needs moral examination.'],
  ['Remembrance contradicts humiliation','The meal concerns Christ’s self-giving. Shaming the poor conflicts with its meaning.'],
  ['Correction gives a practical response','Paul tells them to wait for one another. Repentance needs a changed arrangement.']], 'Does a shared activity disadvantage someone with fewer resources?','Change an arrangement which humiliates or excludes a person.'],
 ['epaphroditus','Epaphroditus becomes ill while serving','Philippians 2:19-30','Paul reports illness, recovery, and the planned return of a valued coworker.',[
  ['Service includes real bodily limits','Epaphroditus becomes seriously ill. Faithful work does not remove the need for care.'],
  ['Distress concerns others as well','He is troubled by the community’s worry. Listen to emotional strain during illness.'],
  ['The worker deserves honour','Paul asks the church to welcome him. Do not measure commitment by uninterrupted productivity.']], 'How do we honour a worker whose health limits their activity?','Reduce a burden and offer specific practical support.'],
 ['onesimus','Paul appeals concerning Onesimus','Philemon 1:8-22','Paul asks Philemon to receive Onesimus in a transformed relationship.',[
  ['The appeal recognises a person','Paul speaks of Onesimus as a brother. A social position must not erase human dignity.'],
  ['Reconciliation has a practical cost','Paul addresses possible debt personally. Repair needs responsibility rather than a demand that harm be ignored.'],
  ['The relationship is challenged by faith','The letter reframes status through belonging in Christ. It must not be used to justify modern slavery or coercion.']], 'Which relationship do we define mainly by someone’s lower status?','Treat the person with equal dignity and address an outstanding obligation fairly.']
], 'Situation reported in a letter'),
eventGroup('revelation','26. Revelation: visions, judgment, and renewed creation','NT','Revelation 1-22. Each vision is studied separately. Christians differ on interpretation and timing; no dates are assigned to future fulfilment.',[
 ['patmos','John’s vision of the risen Christ','Revelation 1','John receives a revelation while on Patmos and sees the risen Jesus.',[
  ['The revelation centres on Jesus','The opening identifies its source and purpose. Begin with Christ rather than a search for sensational predictions.'],
  ['Glory meets human fear','John falls and receives reassurance. Reverence belongs alongside hope.'],
  ['The symbols receive explanation','The chapter explains stars and lampstands. Use the text’s own interpretation before inventing connections.']], 'Which symbols does the chapter explain directly?','Write the given explanations and distinguish them from an inference.'],
 ['seven-churches','Messages to the seven churches','Revelation 2-3','The churches receive distinct messages concerning faithfulness, failure, and response.',[
  ['Jesus addresses actual conduct','The messages name love, endurance, compromise, and complacency. Examine actions rather than reputation alone.'],
  ['Correction is specific','Different communities face different needs. Do not apply every rebuke indiscriminately to everyone.'],
  ['Hearing requires response','The repeated call concerns listening. A warning should lead to a definite change.']], 'Which message names a practice we should examine?','Read one church’s message and agree on a specific response.'],
 ['throne','The heavenly throne room','Revelation 4','John sees worship around the throne.',[
  ['The throne places authority with God','The vision directs attention beyond earthly power. Do not make a ruler or institution the ultimate source of security.'],
  ['Worship names holiness and creation','The praise concerns God’s character and work. Keep those claims central rather than speculation about imagery.'],
  ['Honour is surrendered','The elders’ action acknowledges dependence. Receive achievement humbly rather than as independent glory.']], 'What earthly power receives too much of our trust?','Pray in gratitude and name a competing source of ultimate security.'],
 ['lamb-scroll','The Lamb and the sealed scroll','Revelation 5','The search for one worthy to open the scroll leads to the Lamb.',[
  ['Worthiness belongs to Christ','The vision identifies the Lion and the slain Lamb. Read the images together around Jesus’ victory through sacrifice.'],
  ['Redemption reaches many peoples','The song describes people from varied nations. Faith must oppose ethnic contempt.'],
  ['Worship acknowledges the Lamb','The response centres on His worth. Do not turn the scene into a claim of personal superiority.']], 'How does the Lamb’s victory differ from ordinary displays of power?','Explain the scene’s connection between sacrifice, redemption, and worship.'],
 ['seals','The seals and the cry of the martyrs','Revelation 6','The seals reveal judgment and a plea for justice from those killed for witness.',[
  ['The images portray severe disruption','The vision includes conflict and loss. Read soberly rather than using fear to control people.'],
  ['The cry seeks God’s judgment','The martyrs appeal for justice. A desire for justice does not authorise personal retaliation.'],
  ['Timing is not fully supplied','The response includes waiting. Do not attach invented dates to the symbols.']], 'How do we pray for justice without pursuing revenge?','Pray for people suffering injustice and support a responsible protective action.'],
 ['multitude','The sealed servants and the great multitude','Revelation 7','A sealing scene is followed by a multitude worshipping before the throne.',[
  ['The vision belongs to God’s keeping','The sealing identifies servants of God. Interpret the imagery carefully rather than using it to rank modern groups.'],
  ['The multitude crosses national boundaries','People from many nations worship together. Christian fellowship must not depend on ethnicity.'],
  ['Comfort addresses real suffering','The promises concern care and the wiping of tears. Hope does not deny the distress people presently endure.']], 'Does our welcome reflect the vision’s breadth?','Offer fair attention to someone outside your usual community.'],
 ['trumpets','The trumpet judgments','Revelation 8-9','Trumpets introduce further scenes of judgment and disruption.',[
  ['Judgment calls for sober reading','The imagery is severe and patterned. Avoid sensational identifications unsupported by the passage.'],
  ['The text recalls wider biblical images','Echoes of plagues and prophetic language inform the scenes. Compare Scripture before assigning a modern referent.'],
  ['Repentance remains a moral concern','The final verses describe continued wrongdoing. Attend to the named conduct instead of predictions alone.']], 'What wrongdoing does the passage explicitly name?','Examine one named practice and make a concrete correction.'],
 ['woman-dragon','The woman, child, and dragon','Revelation 12','A symbolic conflict presents the dragon’s opposition and the testimony of God’s people.',[
  ['The chapter identifies the dragon','The text connects the image with Satan. Begin from the given explanation rather than invented claims about present individuals.'],
  ['Victory is linked with the Lamb','The believers’ testimony follows His work. Do not make hostility toward neighbours an expression of spiritual warfare.'],
  ['Faithfulness includes costly endurance','The conflict continues within the vision. Hope does not require pretending pressure is absent.']], 'Which explanations come from the chapter itself?','Separate the stated meanings from interpretations which need further study.'],
 ['beasts','The beasts and pressure to worship','Revelation 13','The vision describes coercive power, deceptive signs, and pressure concerning allegiance.',[
  ['Power seeks worship','The demand concerns loyalty, not ordinary respect alone. Refuse to treat earthly authority as ultimate.'],
  ['An impressive sign needs testing','Deception appears alongside spectacle. Evaluate a teaching by its truth rather than its display.'],
  ['Wisdom resists reckless identification','The chapter calls for discernment. Do not assign a contemporary person or technology a certain role beyond the evidence.']], 'What does the chapter emphasise about allegiance?','Identify a clear duty which should govern your response to social pressure.'],
 ['bowls-babylon','The bowls and the fall of Babylon','Revelation 15-18','Judgment scenes lead to a portrayal of Babylon’s fall and the grief of those who profit from it.',[
  ['Justice includes the victims','The vision names oppression and bloodshed. Keep harmed people visible when evaluating a prosperous system.'],
  ['Profit does not establish moral worth','Merchants mourn their lost trade. Economic success does not justify exploitation.'],
  ['The call concerns faithful separation','The warning addresses participation in wrongdoing. Apply clear moral duties without inventing a precise modern map of every symbol.']], 'What profitable practice would conflict with our duty to people?','Review a business or financial practice for fairness and exploitation.'],
 ['lamb-victory','The marriage supper and the victorious rider','Revelation 19','The vision joins rejoicing over the Lamb’s union with a portrayal of His victorious judgment.',[
  ['Joy centres on the Lamb','The celebration concerns Christ rather than an observer’s importance. Worship should keep Him central.'],
  ['Faithfulness has a visible response','The clothing is explained through righteous deeds. Hope should shape present conduct.'],
  ['Judgment belongs to Christ','The rider’s victory is His action. The vision never authorises personal violence against people today.']], 'How should future hope shape present conduct?','Choose an act of truthful and generous faithfulness this week.'],
 ['final-judgment','The final defeat and judgment','Revelation 20','The vision describes the defeat of evil and judgment before the great white throne.',[
  ['The sequence requires careful study','Christians interpret the millennium differently. Distinguish the text’s wording from a particular interpretive framework.'],
  ['Evil does not have the last word','The final defeat directs hope toward God’s justice. Refuse despair without denying present suffering.'],
  ['Accountability is comprehensive','The judgment scene includes the dead before God. Treat daily conduct as morally significant.']], 'Which claims come directly from the passage, and which depend on interpretation?','Read the chapter and label an unresolved interpretation honestly.'],
 ['new-creation','The new heaven, new earth, and New Jerusalem','Revelation 21','John sees renewed creation and God dwelling with His people.',[
  ['The promise concerns God’s presence','The central declaration is His dwelling with people. Hope centres on relationship with Him.'],
  ['Sorrow and death are addressed','The promise names tears, death, and pain. Comfort should honour the losses people experience now.'],
  ['The city portrays holiness and belonging','The imagery joins beauty with moral clarity. Future hope should encourage truthful conduct in the present.']], 'Which promised change speaks to a present sorrow?','Pray with someone grieving and offer patient practical support.'],
 ['river-life','The river of life and the final invitation','Revelation 22','The closing vision presents life, service, and a final call concerning Jesus’ coming.',[
  ['Life comes from God and the Lamb','The river and tree belong to their provision. Read the imagery around its stated source.'],
  ['The future includes faithful service','God’s servants worship and serve. Hope should strengthen responsibility rather than escape from all duty.'],
  ['The invitation ends with watchful hope','The final words call for faithful response. Do not add a date or claim beyond the book’s instruction.']], 'How does the closing hope direct our present life?','Review one habit and align it with truthful service and patient hope.']
], 'Apocalyptic vision')
];

/* Split related scenes before building the library. Grouping never merges
   their journals. The original twelve saved IDs remain available. */
function separateEvents(groupId,slug,rows){
 const group=BIBLE_EVENT_GROUPS.find(g=>g.id===groupId),index=group.rows.findIndex(r=>r[0]===slug);
 if(index<0)throw new Error('Unknown event to separate: '+slug);
 group.rows.splice(index,1,...rows);
}
separateEvents('abraham','lot-rescue',[
 ['lot-rescue','Abram rescues Lot','Genesis 14:1-16','Warfare captures Lot, and Abram gathers support to rescue him.',[
 ['Care survives disagreement','Abram helps the relative who previously separated from him. A difference need not erase every responsibility of care.'],['Courage includes preparation','Abram organises a response with allies. Necessary action benefits from a realistic assessment and support.'],['The rescue concerns vulnerable people','People and goods are recovered. Keep those needing protection central rather than personal glory.']], 'Who needs care despite a disagreement?','Offer responsible help without making agreement on every issue a condition.'],
 ['melchizedek','Abram meets Melchizedek','Genesis 14:17-24','After the rescue, Abram receives a blessing and rejects a compromising reward.',[
 ['Blessing directs praise to God','Melchizedek recognises God’s role. Achievement should lead to gratitude rather than a claim of complete self-sufficiency.'],['Giving responds to recognition','Abram gives from the recovered goods. Read this specific account before drawing broader conclusions about giving.'],['Integrity examines a reward','Abram refuses an offer which would compromise his testimony. Gifts carry terms which deserve review.']], 'What obligation accompanies an attractive reward?','Discuss the terms of an offer before accepting it.']
]);
separateEvents('abraham','abraham-visitors',[
 ['abraham-visitors','The visitors announce Sarah’s son','Genesis 18:1-15','Abraham welcomes visitors who announce the birth of Sarah’s son.',[
 ['Hospitality includes practical work','The welcome involves food and attention. Share its labour fairly rather than exhausting one spouse.'],['The announcement names Sarah','The promise recognises her place. Include both spouses when discussing shared hopes and responsibility.'],['Doubt receives a direct question','Sarah’s laughter is addressed. Bring uncertainty honestly instead of concealing it behind religious language.']], 'How do we share hospitality and discuss doubt honestly?','Share a practical task and listen to an unresolved concern.'],
 ['abraham-intercedes','Abraham intercedes concerning Sodom','Genesis 18:16-33','Abraham appeals to God about justice before the judgment of Sodom.',[
 ['The appeal concerns justice','Abraham asks about righteous and wicked people. Prayer must include concern for lives beyond personal comfort.'],['Boldness remains reverent','The repeated request acknowledges human limitation. Speak honestly without treating God as subject to your control.'],['The outcome is not owned by the petitioner','The encounter ends without Abraham deciding the judgment. Intercession seeks mercy while recognising God’s authority.']], 'Whose need should enter our intercession?','Pray specifically for people affected by injustice.']
]);
separateEvents('abraham','isaac-birth',[
 ['isaac-birth','Isaac is born','Genesis 21:1-7','Sarah gives birth after a long period of waiting.',[
 ['The account recalls God’s word','The birth is linked with the promise. Gratitude should remember the source of help.'],['Joy acknowledges earlier uncertainty','Sarah speaks about laughter. Allow relief without pretending the wait was easy.'],['The family responds practically','Abraham carries out the naming and covenant instruction. A blessing still brings responsibilities.']], 'What responsibility accompanies a good outcome?','Give thanks and fulfil a duty connected with a blessing received.'],
 ['hagar-ishmael','God hears Hagar and Ishmael in the wilderness','Genesis 21:8-21','Household conflict sends Hagar and Ishmael away, where distress and divine provision follow.',[
 ['The conflict affects vulnerable people','Hagar and her son bear the cost. Examine the people affected by a family decision.'],['God hears the child’s distress','The account gives attention to those outside Abraham’s immediate household. Care must not stop at your own advantage.'],['Help addresses a real need','Water and reassurance answer the crisis. Compassion should lead to practical provision.']], 'Who bears an overlooked cost of our decision?','Ask about an affected person’s need and arrange responsible help.']
]);
separateEvents('exodus','early-plagues',[
 ['water-blood','The Nile turns to blood','Exodus 7:14-25','The first plague challenges Pharaoh’s refusal to release Israel.',[
 ['Refusal has public effects','The water supply is affected. A stubborn decision sometimes imposes costs on many people.'],['Imitation does not remove the crisis','The magicians’ response fails to restore the water. An impressive display is not the same as useful help.'],['Pharaoh refuses attention','The king turns away while people seek water. Leadership must hear the consequences others endure.']], 'Whose needs are absent from our decision?','Listen to a person bearing the cost of a choice you control.'],
 ['frogs','The plague of frogs','Exodus 8:1-15','Pharaoh requests relief and then returns to refusal.',[
 ['The demand is repeated clearly','The instruction to release the people remains explicit. Confusion is not the reason for every delayed duty.'],['Relief invites an honest response','Pharaoh asks Moses to intercede. A request for help should not conceal an unchanged intention.'],['Comfort exposes the earlier promise','After relief, Pharaoh hardens his heart. Keep commitments made while under pressure.']], 'Do we keep a promise after relief arrives?','Fulfil one commitment made during a difficult season.'],
 ['gnats','The plague of gnats','Exodus 8:16-19','The magicians cannot reproduce the plague and acknowledge a power beyond themselves.',[
 ['Ability has limits','The magicians fail in this attempt. Recognise a limit without inventing an excuse.'],['Evidence challenges a settled position','Their acknowledgment changes the available information. Reconsider a view when facts require it.'],['Refusal survives a warning','Pharaoh still will not listen. Knowledge helps only when it affects conduct.']], 'What evidence have we refused to consider?','Revisit a decision in light of credible new information.'],
 ['flies','The plague of flies','Exodus 8:20-32','Pharaoh proposes limited terms, receives relief, and refuses release again.',[
 ['A proposed compromise needs examination','Pharaoh’s terms retain control. An offer should be judged by what it permits and withholds.'],['The commitment is stated','The conversation includes a promise. Clear terms make later conduct accountable.'],['Relief reveals the real response','Pharaoh withdraws the promise after the flies depart. Changed conditions should not cancel honesty.']], 'Does our compromise preserve an unfair control?','Review an agreement and remove a manipulative condition.']
]);
separateEvents('exodus','later-plagues',[
 ['livestock','The plague on livestock','Exodus 9:1-7','A announced judgment affects Egypt’s livestock while Pharaoh investigates the distinction.',[
 ['The warning precedes the event','The instruction and time are announced. Attend to a credible warning rather than delaying until costs grow.'],['The distinction is investigated','Pharaoh sends to check the report. Evidence deserves a response beyond its collection.'],['Refusal persists despite knowledge','The king still will not release Israel. Accurate information is not enough without changed conduct.']], 'What known fact should change our decision?','Act on information you have already confirmed.'],
 ['boils','The plague of boils','Exodus 9:8-12','The affliction affects people and animals and disables the magicians’ participation.',[
 ['Public confidence meets weakness','The magicians cannot stand before Moses. Status does not remove bodily vulnerability.'],['The affliction is widely costly','People and animals are affected. Keep suffering visible rather than discussing power alone.'],['The refusal continues','The narrative retains Pharaoh’s resistance. Repeated harm should lead to moral examination.']], 'Who suffers while a powerful person resists correction?','Support an affected person and raise a concern responsibly.'],
 ['hail','The plague of hail','Exodus 9:13-35','A warning permits shelter before hail strikes, and Pharaoh later returns to refusal.',[
 ['Protection requires an action','Some servants bring people and animals inside. Act on credible safety information.'],['Confession needs follow-through','Pharaoh admits wrongdoing under pressure. A statement is tested by later conduct.'],['The remaining loss still matters','The account describes agricultural damage. Relief does not remove the responsibility to address consequences.']], 'What protective warning requires action?','Take a practical precaution instead of dismissing inconvenience.'],
 ['locusts','The plague of locusts','Exodus 10:1-20','Pharaoh’s servants warn of devastation, but the refusal continues.',[
 ['The advisers name widening harm','The servants urge a response. Listen when trusted observers describe costs you have ignored.'],['A selective offer retains control','Pharaoh limits who will leave. A concession should not disguise the same underlying injustice.'],['Words after loss need testing','Pharaoh requests forgiveness and relief. Sincerity must appear in changed behaviour.']], 'What fair criticism have we dismissed?','Listen to a concern and make a specific correction.'],
 ['darkness','The plague of darkness','Exodus 10:21-29','Darkness precedes another limited offer and a final hostile exchange.',[
 ['The crisis exposes dependence','Movement is disrupted. Ordinary abilities depend on conditions beyond personal control.'],['The offer remains incomplete','Pharaoh allows people but withholds livestock. Examine whether an apparent agreement still prevents its stated purpose.'],['Hostility closes the discussion','The final threat replaces reason. Refuse intimidation as a method for resolving conflict.']], 'Do our terms permit the agreement’s actual purpose?','Clarify a condition and remove an unfair restriction.']
]);
separateEvents('exodus','passover',[
 ['passover','Israel prepares the Passover','Exodus 12:1-28; 1 Corinthians 5:7-8','Israel receives particular instructions for a meal and memorial before departure.',[
 ['Rescue begins with God’s instruction','The protection belongs to this historical deliverance. Do not invent a modern ritual claiming automatic safety.'],['Remembrance needs explanation','The memorial includes teaching about what happened. Gratitude should retain a clear account of mercy.'],['Later Scripture connects Passover with Christ','Paul connects the image with sincere conduct. Redemption should shape honesty and faithful treatment of one another.']], 'What conduct should change through remembrance of redemption?','Discuss a specific correction in honesty or generosity.'],
 ['firstborn','The final plague and Pharaoh’s release order','Exodus 12:29-36','The death of the firstborn brings grief and Pharaoh’s order for Israel to leave.',[
 ['The judgment includes devastating loss','The cries of the households keep suffering visible. Read soberly rather than celebrating death.'],['Persistent refusal ends under pressure','Pharaoh finally commands departure. Obedience should not wait until harm becomes overwhelming.'],['The event is historical and particular','The narrative never authorises harming another household today. Present application concerns humility, justice, and accountability.']], 'How do we read judgment while respecting the people who suffer?','Examine a delayed moral duty and respond before further harm grows.']
]);
separateEvents('wilderness','balaam',[
 ['balaam','Balaam’s journey and the donkey','Numbers 22','Balak seeks a curse, and Balaam’s journey receives an unexpected interruption.',[
 ['Reward pressures judgment','The invitation carries money and honour. Examine how reward affects a claimed spiritual decision.'],['Correction comes unexpectedly','The donkey sees the obstacle first. Do not dismiss a correction because its source lacks status.'],['The instruction limits the message','Balaam is told to speak the given word. Personal gain must not reshape religious speech.']], 'What reward influences our judgment?','Review a decision affected by money or approval.'],
 ['balaam-blessings','Balaam blesses rather than curses Israel','Numbers 23-24','Balak’s repeated efforts fail to produce the curse he wants.',[
 ['Repeated pressure seeks a preferred answer','Balak changes locations and repeats his demand. Do not shop for advice solely until someone endorses your plan.'],['God’s word resists purchase','The messages do not become a paid weapon. Truth must not serve a client’s hostility.'],['The response rejects the demanded outcome','Balak’s frustration exposes his purpose. A faithful answer sometimes disappoints the person paying for it.']], 'Are we seeking truthful counsel or endorsement?','Hear an unwelcome but well-supported answer fairly.']
]);
separateEvents('wilderness','moses-final',[
 ['joshua-successor','Moses commissions Joshua','Deuteronomy 31:1-8','Moses prepares the people for Joshua’s leadership.',[
 ['Leadership equips another person','Moses encourages Joshua publicly. Service should prepare continuity rather than dependency on one leader.'],['The task exceeds one lifetime','The people will continue after Moses. A shared duty matters beyond personal control.'],['Courage has a defined responsibility','Joshua is encouraged for the work ahead. Confidence should support preparation and care.']], 'Which duty needs a clearer handover?','Explain a recurring responsibility so another person is prepared.'],
 ['moses-final','Moses dies before Israel enters the land','Deuteronomy 34','Moses sees the land and dies, and the people mourn before continuing.',[
 ['A faithful life includes limits','Moses does not enter the land. Do not judge a whole life solely by its final unmet desire.'],['The community makes room for grief','The people mourn him. A transition deserves time and practical support.'],['The work continues through another leader','Joshua carries the responsibility onward. Honour an earlier leader without preventing future service.']], 'How do we honour a life without denying its limits?','Support a transition with gratitude and a practical handover.']
]);
separateEvents('elijah-elisha','shunammite',[
 ['shunammite','The Shunammite woman welcomes Elisha','2 Kings 4:8-17','Hospitality leads to an announced birth.',[
 ['Hospitality notices a recurring need','The woman prepares accommodation. Generosity often begins with ordinary observation.'],['The response does not demand a favour','She serves without presenting a claim over Elisha. Care should not become a hidden transaction.'],['A personal hope is addressed','The promise concerns her particular situation. Do not turn it into a guarantee for every household.']], 'Does our generosity carry an unspoken demand?','Offer useful help without requiring an advantage in return.'],
 ['shunammite-grief','The Shunammite woman seeks Elisha after her son dies','2 Kings 4:18-28','The child dies, and his mother goes to seek Elisha.',[
 ['The loss is not concealed from the narrative','The child’s death receives direct attention. Faithful care must acknowledge grief plainly.'],['A brief answer does not tell the whole experience','Her words during the journey do not erase the loss. Do not infer peace solely from someone’s outward speech.'],['Distress asks for personal attention','She speaks to Elisha about her anguish. Listen instead of offering a convenient slogan.']], 'Do we listen beyond a person’s brief public answer?','Make time to hear a grieving person’s actual concern.'],
 ['shunammite-restoration','Elisha prays and the child is restored','2 Kings 4:29-37','Elisha attends to the child and prays before his restoration.',[
 ['The need receives persistent attention','Elisha enters the room and prays. Care requires presence rather than a distant formula.'],['Restoration is not controlled by an object','The staff alone does not restore the child. Do not treat a religious item as automatic power.'],['The event ends with gratitude','The mother receives her child. This particular restoration is not a promise of the same outcome after every death.']], 'How do we support someone without promising an identical miracle?','Offer patient presence and practical help during a family crisis.']
]);
separateEvents('exile','esther-position',[
 ['esther-position','Esther becomes queen','Esther 2:1-18','Esther enters an imperial household and becomes queen.',[
 ['The setting involves unequal power','The arrangements belong to an imperial system. Description does not require approval of every practice.'],['Position creates responsibility','Esther’s new role gives influence. Ask whose needs become your concern through access you hold.'],['Identity is shaped under pressure','The account includes concealment and advice. Read the situation carefully before making it a model for every circumstance.']], 'What responsibility follows from our influence?','Use access you hold to help someone fairly.'],
 ['mordecai-plot','Mordecai reports the plot against the king','Esther 2:19-23','Mordecai hears a threat and reports it through Esther.',[
 ['Attention notices a serious risk','The threat is identified before harm occurs. Do not dismiss credible information because intervention is inconvenient.'],['The report follows an accountable route','Esther communicates the matter with its source. Preserve accuracy rather than taking another person’s credit.'],['Unrecognised service still matters','The act is recorded before reward arrives. Do a necessary duty without requiring immediate recognition.']], 'Do we preserve another person’s contribution accurately?','Credit a contributor and pass on a serious concern responsibly.']
]);
separateEvents('exile','esther-deliverance',[
 ['esther-deliverance','Esther exposes Haman’s plan','Esther 6-7','Mordecai’s earlier service receives recognition, and Esther identifies the threat.',[
 ['Past service receives attention later','The records affect the reversal. Honest work matters even when recognition is delayed.'],['Truth names the threat clearly','Esther explains the danger to her people. A serious appeal needs an accurate account.'],['Power is held accountable','Haman’s scheme is exposed. Do not treat influence as protection from scrutiny.']], 'What concern needs accurate disclosure?','Prepare a factual account and raise it through a responsible route.'],
 ['esther-defence','The Jews receive permission to defend themselves','Esther 8-9:19','A new decree permits defence against the announced threat.',[
 ['Protection requires a practical arrangement','The response addresses the danger through a decree. Concern needs a workable plan.'],['The historical conflict is particular','The account belongs to an imperial setting. It does not authorise modern personal retaliation or indiscriminate violence.'],['Gratitude remembers lives preserved','The outcome brings relief after fear. Keep the vulnerable people central.']], 'What protective action is within our responsibility?','Improve one responsible arrangement for a person facing danger.'],
 ['purim','Purim is established','Esther 9:20-32','Letters establish a yearly remembrance of deliverance.',[
 ['The memory is communicated','The letters explain the observance. A family memory needs a truthful account.'],['Joy includes care for others','Gifts to the poor accompany celebration. Gratitude should extend beyond your own relief.'],['Remembrance has a shared form','The practice helps preserve the account. Mark important mercy without turning the observance into a guarantee of safety.']], 'How does our celebration include someone in need?','Mark a mercy received with a concrete act of generosity.']
]);
separateEvents('return','ezra-reading',[
 ['ezra-reading','Ezra reads and explains the law','Nehemiah 8','Public reading and explanation lead to grief, instruction, and celebration.',[
 ['Reading needs understanding','The teachers explain the meaning. Learn what the passage says before applying it.'],['Conviction has a path forward','The people receive instruction concerning joy. Correction should not become humiliation without hope.'],['Learning leads to practice','The community responds to the discovered instruction. Agreement needs an actual step.']], 'Do we understand the passage before applying it?','Read a paragraph and each explain its meaning in context.'],
 ['community-confession','The people confess their history of failure','Nehemiah 9','The community recounts God’s mercy and its own repeated unfaithfulness.',[
 ['Confession names a pattern','The prayer includes more than an isolated mistake. Examine repeated conduct honestly.'],['Memory also recognises mercy','God’s faithfulness remains visible throughout the account. Repentance should not invent abandonment.'],['The response concerns present responsibility','The historical account leads toward renewed commitment. Learning from the past must shape a current duty.']], 'Which repeated pattern needs confession and change?','Name the pattern and agree on a measurable practical correction.']
]);
separateEvents('revelation','seven-churches',[
 ['ephesus-message','The message to Ephesus','Revelation 2:1-7','Ephesus receives recognition for endurance and a correction concerning its first love.',[
 ['Faithfulness includes careful testing','The message recognises labour and rejection of false claims. Examine teaching rather than accepting a title alone.'],['Right activity does not replace love','The correction concerns love despite substantial effort. Review whether duty has become contempt or coldness.'],['Repentance resumes faithful conduct','The church is told to remember, repent, and do the former works. Acknowledgment needs a definite response.']], 'Where has a good duty lost a loving purpose?','Restore one patient act of care within a recurring responsibility.'],
 ['smyrna-message','The message to Smyrna','Revelation 2:8-11','Smyrna receives encouragement amid poverty, hostility, and coming suffering.',[
 ['Jesus knows the distress','The message names suffering and poverty. Public hardship does not imply abandonment.'],['Faithfulness is not purchased by safety','The warning includes imprisonment and possible death. Do not promise physical escape as the reward for every conviction.'],['Hope rests on the risen Christ','The speaker identifies His death and life. Christian courage concerns Him rather than denial of danger.']], 'How do we support conviction without promising safety?','Pray for someone under pressure and arrange practical support.'],
 ['pergamum-message','The message to Pergamum','Revelation 2:12-17','Pergamum receives recognition for holding fast and a warning about tolerated compromise.',[
 ['Courage deserves recognition','The message names faithfulness amid hostility. Honour endurance without overlooking current wrongs.'],['Tolerance still needs moral limits','The rebuke concerns teaching which encourages unfaithfulness. Welcome people without endorsing harmful conduct.'],['The response requires repentance','The warning directs a change. Do not use an earlier victory to excuse a present compromise.']], 'What compromise have we accepted because of earlier success?','Correct a practice conflicting with a clear biblical duty.'],
 ['thyatira-message','The message to Thyatira','Revelation 2:18-29','Thyatira receives recognition for love and service alongside a rebuke concerning corrupt influence.',[
 ['Growth receives acknowledgment','The message recognises love, faith, and service. Correction need not erase every faithful contribution.'],['A claimed revelation needs examination','The rebuke concerns a teacher’s harmful influence. Test spiritual claims by their content and effects.'],['Accountability concerns conduct','The message names deeds and steadfastness. Never use its imagery to label or harass a present individual.']], 'How do we test a claim of spiritual authority?','Compare a teaching with its cited passage and examine the practical effect.'],
 ['sardis-message','The message to Sardis','Revelation 3:1-6','Sardis has a reputation for life but receives a call to wake up.',[
 ['Reputation differs from reality','The message challenges the public appearance. Examine actual conduct rather than favourable recognition.'],['Neglected duties need strengthening','The remaining things require attention. Begin with a concrete responsibility instead of a new display.'],['Remembering leads to repentance','The church must keep what it received. A past lesson matters when it changes present action.']], 'What reputation is stronger than our actual practice?','Strengthen a neglected duty through a specific weekly habit.'],
 ['philadelphia-message','The message to Philadelphia','Revelation 3:7-13','Philadelphia receives encouragement for keeping the word despite limited strength.',[
 ['Limited strength is acknowledged','The message does not demand pretence of unlimited capacity. Be truthful about resources and limits.'],['Faithfulness matters within limitation','The church keeps the word and does not deny Jesus. Do a clear duty without waiting for ideal conditions.'],['The encouragement calls for perseverance','The church is told to hold fast. Hope should support steady conduct rather than passive expectation.']], 'What duty is possible within our present limits?','Choose a manageable act of faithfulness and carry it consistently.'],
 ['laodicea-message','The message to Laodicea','Revelation 3:14-22','Laodicea’s confidence in wealth meets a correction concerning its real need.',[
 ['Comfort conceals dependence','The church claims sufficiency while lacking what it needs. Possessions do not measure spiritual health.'],['Correction is connected with love','The call to repentance follows a declaration of care. Receive a fair rebuke without equating it with rejection.'],['The response must be active','The invitation calls for hearing and opening. Move from self-satisfaction toward honest repentance.']], 'Where does comfort make us unwilling to receive correction?','Invite truthful feedback and act on a specific concern.']
]);
separateEvents('revelation','multitude',[
 ['sealed-servants','The sealing of God’s servants','Revelation 7:1-8','A sealing scene interrupts the sequence of judgments.',[
 ['The servants belong to God','The marking concerns His people. Read carefully rather than using the image to rank present communities.'],['The pattern requires interpretation','The tribe list is deliberately arranged. Distinguish the passage’s wording from an assumed literal or symbolic framework.'],['The scene directs hope toward God’s keeping','Protection is portrayed within the vision. Do not turn a number into a self-appointed guarantee for your group.']], 'Which claims are explicit and which depend on interpretation?','Record the vision’s details before choosing an interpretation.'],
 ['multitude','The great multitude before the throne','Revelation 7:9-17','People from many nations worship before the throne and the Lamb.',[
 ['The people cross national boundaries','The multitude includes varied languages and peoples. Christian dignity must not depend on ethnicity.'],['The praise belongs to God and the Lamb','The worship names the source of salvation. Keep personal status outside the centre of the scene.'],['Comfort recognises suffering','The promises address hunger, thirst, and tears. Hope should encourage care for distress now.']], 'Does our welcome reflect the vision’s breadth?','Give fair attention to someone outside your usual community.']
]);
separateEvents('revelation','bowls-babylon',[
 ['bowl-judgments','The bowls of judgment','Revelation 15-16','Worship and seven bowls portray a further sequence of judgment.',[
 ['The praise names justice','The worship recognises God’s judgments. Do not claim your own retaliation is therefore divinely approved.'],['The imagery echoes other Scripture','Plagues and prophetic language inform the scenes. Compare passages before assigning modern counterparts.'],['The warning calls for watchfulness','The chapter includes an appeal to stay awake. Present conduct matters more than invented dates.']], 'What instruction is clear despite debated symbolism?','Identify a faithful duty and fulfil it without speculative claims.'],
 ['babylon-fall','The fall of Babylon','Revelation 17-18','The vision describes a corrupt power and the grief of those who profit from it.',[
 ['The victims remain morally central','The account names oppression and bloodshed. Keep harmed people visible when evaluating a prosperous system.'],['Profit does not establish moral worth','Merchants mourn lost trade. Economic success cannot justify exploitation.'],['Separation concerns participation in wrong','The warning addresses complicity. Apply clear moral duties without inventing a precise map of every symbol.']], 'What profitable practice conflicts with duty to people?','Review a business or financial practice for fairness.']
]);
separateEvents('revelation','lamb-victory',[
 ['marriage-supper','The marriage supper of the Lamb','Revelation 19:1-10','Praise leads to the announcement of the Lamb’s marriage supper.',[
 ['Joy centres on the Lamb','The celebration concerns Christ. Worship should not become a display of an observer’s importance.'],['The clothing receives an explanation','The text connects the image with righteous deeds. Future hope should shape truthful conduct now.'],['Worship has a proper object','John is corrected after falling before the angel. Do not turn a messenger into the object of allegiance.']], 'Where does admiration for a messenger replace attention to God?','Review a loyalty and choose a faithful action centred on Christ.'],
 ['victorious-rider','The victorious rider','Revelation 19:11-21','A rider identified through titles and imagery appears in a scene of judgment.',[
 ['The identity governs the scene','The rider’s names concern truth and authority. Read the vision around Christ rather than personal triumph.'],['Judgment belongs to Him','The action is presented as His judgment. The scene never authorises personal violence against neighbours.'],['The outcome opposes corrupt power','The vision portrays defeat of evil. Hope should lead to justice and responsible care now.']], 'How do we hope for justice without claiming personal permission to harm?','Choose a fair, protective response to a present injustice.']
]);
separateEvents('revelation','final-judgment',[
 ['millennium','The millennium vision','Revelation 20:1-6','John sees the binding of Satan and a reign with Christ.',[
 ['The details require careful reading','Christians interpret this sequence differently. Distinguish the text from a specific interpretive framework.'],['The vision honours costly witness','Those killed for testimony receive attention. Remember people who suffer rather than treating the scene as abstract debate.'],['Hope remains centred on Christ','The reign is with Him. Do not attach dates beyond what the passage supplies.']], 'Which conclusion depends on an interpretation rather than an explicit statement?','Read the chapter and label a debated conclusion honestly.'],
 ['final-defeat','The final defeat of evil','Revelation 20:7-10','The vision describes a last opposition and its defeat.',[
 ['Opposition is not permanent sovereignty','The threat is real but bounded within the vision. Present suffering does not establish evil’s final victory.'],['Judgment remains God’s action','The defeat is described as divine intervention. Hope does not authorise personal retaliation.'],['The ending concerns moral accountability','The scene refuses an outcome where evil simply goes unanswered. Act justly without inventing a timetable.']], 'How does hope affect our response to present wrongdoing?','Support a person harmed and refuse a revenge response.'],
 ['great-white-throne','Judgment before the great white throne','Revelation 20:11-15','The dead stand before God in a comprehensive judgment scene.',[
 ['Every position faces accountability','The vision includes great and small. Status cannot make wrongdoing morally insignificant.'],['Conduct is not concealed','The books imagery presents an account of deeds. Let daily choices receive honest scrutiny.'],['The book of life remains significant','The text distinguishes it within the judgment. Read the scene with the wider New Testament gospel rather than inventing a scale of self-earned salvation.']], 'What hidden conduct should receive honest examination?','Confess a specific wrong and begin responsible repair.']
]);
separateEvents('revelation','new-creation',[
 ['new-creation','The new heaven and new earth','Revelation 21:1-8','The vision announces renewed creation and God dwelling with His people.',[
 ['The centre is God’s presence','His dwelling with people defines the promise. Hope rests on relationship with Him.'],['Loss receives a specific answer','The promise names tears, death, and pain. Comfort should respect grief experienced now.'],['The promise includes moral clarity','The passage distinguishes faithful belonging and wrongdoing. Future hope should strengthen present integrity.']], 'Which promise speaks to a present sorrow?','Pray with a grieving person and offer patient support.'],
 ['new-jerusalem','The New Jerusalem','Revelation 21:9-27','John sees the city through imagery of beauty, holiness, and belonging.',[
 ['The city is linked with the bride','The introduction supplies a relational image. Read its purpose before treating every measurement as a modern map.'],['God and the Lamb are central','The account identifies the temple and light through them. Hope is more than attractive architecture.'],['Belonging includes the nations','The vision describes peoples bringing honour. Refuse ethnic contempt while attending to the passage’s holiness.']], 'What does the vision identify as the city’s light?','Explain the stated centre of the city and choose an inclusive act of care.']
]);
separateEvents('revelation','river-life',[
 ['river-life','The river and tree of life','Revelation 22:1-5','The closing vision portrays life from the throne and the service of God’s people.',[
 ['Life has a stated source','The river comes from the throne of God and the Lamb. Keep the source central to interpretation.'],['The image includes healing','The tree’s leaves concern the nations. Hope should encourage care beyond your own circle.'],['The future includes service','The servants worship and serve. Hope does not remove present responsibility.']], 'How does this hope shape service now?','Choose a practical act of care beyond your immediate household.'],
 ['final-invitation','The final testimony and invitation','Revelation 22:6-21','The book closes with assurances, warnings, and the call concerning Jesus’ coming.',[
 ['The words call for a response','The closing instructions concern faithfulness. Reading should lead to action rather than prediction alone.'],['The warning respects the testimony','The reader is told not to alter the words. Avoid adding invented claims or dates.'],['The invitation ends in hope','The final appeal looks toward Jesus and grace. Let patient hope strengthen truthful conduct today.']], 'What clear instruction should govern our next action?','Review a habit and align it with faithful service and patient hope.']
]);
separateEvents('prophets-suffering','jonah-flight',[
 ['jonah-flight','Jonah flees and the storm strikes','Jonah 1','Jonah refuses the commission and boards a ship, placing others within the resulting crisis.',[
 ['Avoidance affects other people','The flight puts sailors at risk. A neglected duty sometimes burdens people who did not choose the problem.'],['Outsiders show moral attention','The sailors ask questions and attempt rescue. Listen to a concern regardless of the speaker’s group.'],['Responsibility requires acknowledgment','Jonah identifies his involvement. Do not make others carry the cost of a concealed decision.']], 'Who bears the cost of our avoidance?','Name a neglected duty and take responsibility for its consequences.'],
 ['jonah-prayer','Jonah prays from the fish','Jonah 2','Jonah turns toward God through a prayer from distress.',[
 ['Distress becomes a direct appeal','The prayer names danger. Speak honestly instead of presenting a false appearance of composure.'],['Gratitude recognises mercy','Jonah remembers rescue while still within an unusual situation. Give thanks without requiring every difficulty to be finished.'],['The response looks toward renewed obedience','The prayer includes a commitment. Returning to God should lead to a faithful next action.']], 'What action should follow our prayer?','Fulfil a clear duty you previously avoided.']
]);
separateEvents('mission','malta-rome',[
 ['malta','Paul receives hospitality on Malta','Acts 28:1-10','The survivors receive practical welcome, and Paul’s experiences change the islanders’ assumptions.',[
 ['Compassion notices immediate need','The islanders provide warmth. Care begins with the practical conditions people face.'],['Quick judgments are unreliable','The crowd changes its conclusion after the snake incident. Do not assign moral guilt from an unexpected event.'],['Help and hospitality become shared','The community receives care and supplies. A relationship should recognise contributions in both directions.']], 'What immediate need have we overlooked?','Offer a useful practical response rather than a quick judgment.'],
 ['malta-rome','Paul arrives and witnesses in Rome','Acts 28:11-31','Paul reaches Rome and continues teaching while under guard.',[
 ['Encouragement supports a difficult journey','Meeting other believers strengthens Paul. Give specific encouragement during a prolonged challenge.'],['The message receives different responses','Some believe and others resist. A mixed response does not make truthful witness pointless.'],['Limitations leave room for service','Paul teaches within his constraint. Identify a useful duty possible with present resources.']], 'What responsibility is possible within our current limits?','Choose a practical act of service within your present capacity.']
]);
const BIBLE_EVENT_STUDIES = BIBLE_EVENT_GROUPS.flatMap(group=>group.rows.map((row,index)=>{
 const [slug,title,ref,context,rawPoints,question,action]=row;
 const id='event-'+slug;
 const legacy=ORIGINAL_BIBLE_EVENT_STUDIES.find(s=>s.id===id);
 const lesson=row.length===1?{...legacy}:{id,title,ref,context,
  points:rawPoints.map(([heading,body])=>[heading,ref,body]),
  questions:[question,'Which part of the passage supports our understanding, and what response belongs in our home?'],
  action,prayer:'Lord, give us understanding of this passage. Help us respond with humility, truth, and faithful care for each other.'};
 if(!lesson.id)throw new Error('Missing event lesson: '+id);
 const book=BIBLE_BOOKS.find(([name])=>lesson.ref.startsWith(name+' '))?.[0];
 if(!book)throw new Error('Unrecognised Bible book: '+lesson.ref);
 const bookIndex=BIBLE_BOOKS.findIndex(([name])=>name===book);
 const volume=bookIndex<=4?1:bookIndex<=16?2:bookIndex<=21?3:bookIndex<=38?4:bookIndex<=42?5:6;
 if(row.length>1){lesson.henry='In Matthew Henry’s Commentary on the Whole Bible, volume '+volume+', find '+lesson.ref+'. Compare his explanation with these study points. Read surrounding verses before applying the lesson. These prompts are original explanations, not quotations from the commentary.';lesson.henryUrl='https://www.ccel.org/ccel/henry/mhc'+volume+'.html';}
 return {...lesson,group:group.id,groupOrder:index+1,book,testament:group.testament,type:group.type,topic:group.name+' '+book};
}));
const ALL_BIBLE_STUDIES = BIBLE_STUDIES.map(s=>({...s,kind:'topic'})).concat(BIBLE_EVENT_STUDIES.map(s=>({...s,kind:'event'})));
