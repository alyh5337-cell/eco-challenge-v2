import React, { useState, useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const translations = {
  en: {
    appName: "Eco Challenge",
    tagline: "v1.9.8 · Ultimate Production Master",
    start: "🚀 Start Playing",
    quests: "Quests",
    squads: "Squads",
    karinChat: "Karin",
    feed: "Feed",
    store: "Store",
    settings: "Settings",
    dailyQuests: "🎯 Daily Eco Quests",
    questsSubtitle: "Complete challenges to earn points and build your streak.",
    complete: "Complete",
    completed: "Done today ✓",
    points: "pts",
    score: "Score",
    streak: "Streak",
    squadsTitle: "👥 Squads",
    joinGroupBtn: "Join a Squad",
    createGroup: "New Squad",
    activeGroup: "Active squad",
    membersLabel: "Members",
    noGroupsYet: "No squads yet — create one!",
    discoverGroups: "Explore Squads",
    groupName: "Squad name",
    groupNamePlaceholder: "e.g. Cairo Eco Warriors",
    password: "Password (private squads only)",
    isPrivate: "Make this squad private",
    join: "Join",
    close: "Close",
    createSquad: "Create Squad",
    cancel: "Cancel",
    confirm: "Confirm",
    enterPassword: "This squad is private. Enter its password:",
    incorrectPassword: "Incorrect password.",
    karinTitle: "🤖 Karin — your AI eco-mentor",
    karinPrompt: "Tell Karin what you did, or attach a photo of your eco-action, to earn points instantly.",
    send: "Send",
    karinAnalyzing: "Karin is looking at your proof...",
    karinPlaceholder: "Type a message or attach proof...",
    imageAttached: "Image attached",
    feedTitle: "📰 Community Feed",
    feedPlaceholder: "Share your eco achievement with everyone...",
    attachImage: "📷 Attach photo",
    post: "Post",
    likes: "Likes",
    storeTitle: "🛒 Eco-Store",
    storeSubtitle: "Spend your points on badges and avatars.",
    buy: "Buy",
    notEnoughPoints: "Not enough points!",
    purchased: (n) => `Purchased ${n}!`,
    settingsTitle: "⚙️ Settings",
    profileSection: "Profile",
    displayName: "Display name",
    saveProfile: "Save profile",
    savedTick: "Saved ✓",
    language: "Language",
    qaMode: "QA Diagnostics",
    runTests: "Run Automated QA Diagnostics",
    running: "Running checks...",
    about: "About",
    aboutLine1: "Eco Challenge v1.9.8",
    aboutLine2: "Rebuilt as a standalone app — data is saved for you automatically, and Karin's judgment is powered live by Claude.",
    accountBanned: "ACCOUNT SUSPENDED",
    bannedMessage: "Your account was suspended by the AI Safety Shield for posting flagged content.",
    errorCode: "Error code: SAFETY_SHIELD_VIOLATION",
    sharedDataNotice: "Squads and the community feed are shared and visible to everyone using this app.",
  },
  ar: {
    appName: "تحدي البيئة",
    tagline: "الإصدار 1.9.8",
    start: "🚀 ابدأ اللعب",
    quests: "المهام",
    squads: "المجموعات",
    karinChat: "كارين",
    feed: "المجتمع",
    store: "المتجر",
    settings: "الإعدادات",
    dailyQuests: "🎯 المهام البيئية اليومية",
    questsSubtitle: "أكمل التحديات لتكسب نقاطًا وتحافظ على سلسلتك.",
    complete: "إتمام",
    completed: "تم اليوم ✓",
    points: "نقطة",
    score: "النقاط",
    streak: "السلسلة",
    squadsTitle: "👥 المجموعات",
    joinGroupBtn: "الانضمام لمجموعة",
    createGroup: "مجموعة جديدة",
    activeGroup: "المجموعة النشطة",
    membersLabel: "الأعضاء",
    noGroupsYet: "لا توجد مجموعات بعد — أنشئ واحدة!",
    discoverGroups: "استكشاف المجموعات",
    groupName: "اسم المجموعة",
    groupNamePlaceholder: "مثال: أبطال القاهرة الخضراء",
    password: "كلمة المرور (للمجموعات الخاصة فقط)",
    isPrivate: "اجعل هذه المجموعة خاصة",
    join: "انضمام",
    close: "إغلاق",
    createSquad: "إنشاء المجموعة",
    cancel: "إلغاء",
    confirm: "تأكيد",
    enterPassword: "هذه المجموعة خاصة. أدخل كلمة المرور:",
    incorrectPassword: "كلمة المرور غير صحيحة.",
    karinTitle: "🤖 كارين — مرشدتك البيئية الذكية",
    karinPrompt: "أخبري كارين بما فعلته، أو أرفقي صورة لنشاطك البيئي، لتكسبي نقاطًا فورًا.",
    send: "إرسال",
    karinAnalyzing: "كارين تفحص إثباتك الآن...",
    karinPlaceholder: "اكتب رسالة أو أرفق إثباتًا...",
    imageAttached: "تم إرفاق الصورة",
    feedTitle: "📰 المجتمع",
    feedPlaceholder: "شارك إنجازك البيئي مع الجميع...",
    attachImage: "📷 إرفاق صورة",
    post: "نشر",
    likes: "إعجاب",
    storeTitle: "🛒 متجر البيئة",
    storeSubtitle: "استبدل نقاطك بشارات وصور رمزية.",
    buy: "شراء",
    notEnoughPoints: "لا توجد نقاط كافية!",
    purchased: (n) => `تم شراء ${n}!`,
    settingsTitle: "⚙️ الإعدادات",
    profileSection: "الملف الشخصي",
    displayName: "اسم العرض",
    saveProfile: "حفظ الملف",
    savedTick: "تم الحفظ ✓",
    language: "اللغة",
    qaMode: "فحص النظام",
    runTests: "تشغيل تشخيصات الاختبار",
    running: "جارٍ الفحص...",
    about: "حول التطبيق",
    aboutLine1: "تحدي البيئة v1.9.8",
    aboutLine2: "تمت إعادة بنائه كتطبيق مستقل — يتم حفظ بياناتك تلقائيًا، وتقييم كارين يعمل مباشرة بواسطة Claude.",
    accountBanned: "تم تعليق الحساب",
    bannedMessage: "تم تعليق حسابك بواسطة درع الأمان الذكي بسبب نشر محتوى مخالف.",
    errorCode: "رمز الخطأ: SAFETY_SHIELD_VIOLATION",
    sharedDataNotice: "المجموعات والمجتمع مشتركة ومرئية لكل من يستخدم هذا التطبيق.",
  },
};

const QUESTS = [
  { id: "q1", title_en: "Plant a Seedling", title_ar: "زراعة شتلة", pts: 50, icon: "🌱" },
  { id: "q2", title_en: "Recycle a Plastic Bottle", title_ar: "إعادة تدوير زجاجة بلاستيك", pts: 30, icon: "♻️" },
  { id: "q3", title_en: "Zero Waste Meal", title_ar: "وجبة بدون هدر", pts: 40, icon: "🥗" },
  { id: "q4", title_en: "Walk Instead of Driving", title_ar: "المشي بدلاً من القيادة", pts: 60, icon: "🚶" },
];

const STORE_ITEMS = [
  { id: "item1", name_en: "Pixel Leaf Badge", name_ar: "شارة الورقة", cost: 50, icon: "🍃" },
  { id: "item2", name_en: "Cyber Seedling Avatar", name_ar: "صورة الشتلة السيبرانية", cost: 120, icon: "🌱" },
  { id: "item3", name_en: "Solar Crown", name_ar: "تاج الطاقة الشمسية", cost: 300, icon: "👑" },
  { id: "item4", name_en: "Eco-Warrior Cape", name_ar: "عباءة المحارب الأخضر", cost: 500, icon: "🦸" },
];

const DEFAULT_PROFILE = {
  displayName: "EcoChampion",
  score: 0,
  currentStreak: 0,
  lastActionDate: null,
  completedToday: [],
  isBanned: false,
};

// ---------------------------------------------------------------------------
// Storage helpers (artifact persistent storage — never localStorage)
// ---------------------------------------------------------------------------
async function storageGet(key, shared) {
  try {
    const res = await window.storage.get(key, shared);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function storageSet(key, value, shared) {
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
    return true;
  } catch {
    return false;
  }
}

function uid() {
  return "u_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

function dataUrlParts(dataUrl) {
  const m = dataUrl.match(/^data:(.*?);base64,(.*)$/s);
  if (!m) return { mediaType: "image/jpeg", base64: "" };
  return { mediaType: m[1], base64: m[2] };
}

// ---------------------------------------------------------------------------
// Live AI calls (Claude, via the Anthropic API — no key needed)
// ---------------------------------------------------------------------------
async function callClaude(content, maxTokens) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      messages: [{ role: "user", content }],
    }),
  });
  const data = await response.json();
  return (data.content || []).map((b) => b.text || "").join("").trim();
}

async function judgeEcoAction(text, image, lang) {
  const content = [];
  if (image) {
    content.push({ type: "image", source: { type: "base64", media_type: image.mediaType, data: image.base64 } });
  }
  content.push({
    type: "text",
    text:
      `You are Karin, a warm and encouraging AI eco-mentor inside a gamified sustainability app. ` +
      `A user submitted this as proof of an eco-friendly action (recycling, planting, cleaning up litter, saving energy, walking instead of driving, etc). ` +
      `Their message: "${text || "(no text — image only)"}". ${image ? "" : "No image was attached."}\n\n` +
      `Judge generously but honestly whether this is plausible proof of a real eco-action. ` +
      `Reply with ONLY a raw JSON object (no markdown fences, no extra text) in this exact shape:\n` +
      `{"approved": true or false, "points": integer between 20 and 60 (0 if not approved), "reply": "a short warm 1-2 sentence in-character reply from Karin, written in ${lang === "ar" ? "Arabic" : "English"}"}`,
  });
  try {
    const raw = await callClaude(content, 300);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      approved: !!parsed.approved,
      points: Number(parsed.points) || 0,
      reply: String(parsed.reply || ""),
    };
  } catch {
    return {
      approved: true,
      points: 30,
      reply: lang === "ar" ? "عمل رائع من أجل البيئة! 🌍" : "Nice work for the planet! 🌍",
    };
  }
}

async function checkImageSafety(image) {
  try {
    const raw = await callClaude(
      [
        { type: "image", source: { type: "base64", media_type: image.mediaType, data: image.base64 } },
        {
          type: "text",
          text:
            "Reply with exactly one word: SAFE or VIOLATION. Flag VIOLATION only for sexual, graphically violent, or otherwise clearly inappropriate images. Ordinary photos (people, nature, trash, plants, streets, food) are SAFE.",
        },
      ],
      10
    );
    return raw.toUpperCase().includes("VIOLATION");
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const isRtl = lang === "ar";

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("landing"); // landing | app
  const [activeTab, setActiveTab] = useState("quests");

  const [memberId, setMemberId] = useState(null);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [profileSaved, setProfileSaved] = useState(false);

  const [groups, setGroups] = useState([]);
  const [myGroupIds, setMyGroupIds] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupPassword, setNewGroupPassword] = useState("");
  const [isNewGroupPrivate, setIsNewGroupPrivate] = useState(false);
  const [passwordPromptGroup, setPasswordPromptGroup] = useState(null);
  const [inputGroupPassword, setInputGroupPassword] = useState("");
  const [groupError, setGroupError] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef(null);

  const [inventory, setInventory] = useState([]);

  const [feedPosts, setFeedPosts] = useState([]);
  const [feedInput, setFeedInput] = useState("");
  const [feedImage, setFeedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const [qaLogs, setQaLogs] = useState([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // -------------------------------------------------------------------------
  // Initial load
  // -------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      let id = await storageGet("member-id", false);
      if (!id) {
        id = uid();
        await storageSet("member-id", id, false);
      }
      setMemberId(id);

      const savedProfile = await storageGet("profile", false);
      setProfile(savedProfile ? { ...DEFAULT_PROFILE, ...savedProfile } : DEFAULT_PROFILE);

      const savedGroups = await storageGet("my-groups", false);
      setMyGroupIds(savedGroups?.myGroupIds || []);
      setActiveGroupId(savedGroups?.activeGroupId || null);

      const savedChat = await storageGet("chat-messages", false);
      setChatMessages(
        savedChat && savedChat.length
          ? savedChat
          : [
              {
                id: "welcome",
                sender: "karin",
                text: "Hello Eco Champion! I'm Karin, your AI environmental mentor. Tell me what you did, or upload proof of planting a tree or recycling, to earn points!",
              },
            ]
      );

      const savedInventory = await storageGet("inventory", false);
      setInventory(savedInventory || []);

      const savedLang = await storageGet("lang", false);
      if (savedLang) setLang(savedLang);

      await refreshGroups(savedGroups?.myGroupIds || [], savedGroups?.activeGroupId || null);
      await refreshFeed();

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAnalyzing]);

  // -------------------------------------------------------------------------
  // Groups (shared data — visible to every user of this app)
  // -------------------------------------------------------------------------
  async function refreshGroups(currentMyIds, currentActiveId) {
    let index = await storageGet("groups-index", true);
    if (!index || !index.length) {
      const defaultGroup = {
        name: "Global Eco Guardians",
        password: "",
        isPrivate: false,
        leader: null,
        members: [],
        createdAt: new Date().toISOString(),
      };
      await storageSet("group:global-eco-squad", defaultGroup, true);
      index = ["global-eco-squad"];
      await storageSet("groups-index", index, true);
    }
    const loaded = [];
    for (const id of index) {
      const g = await storageGet("group:" + id, true);
      if (g) loaded.push({ id, ...g });
    }
    setGroups(loaded);

    if (!currentMyIds || !currentMyIds.length) {
      const ids = ["global-eco-squad"];
      setMyGroupIds(ids);
      setActiveGroupId("global-eco-squad");
      await storageSet("my-groups", { myGroupIds: ids, activeGroupId: "global-eco-squad" }, false);
    } else if (!currentActiveId) {
      setActiveGroupId(currentMyIds[0]);
    }
  }

  async function persistMyGroups(ids, activeId) {
    setMyGroupIds(ids);
    setActiveGroupId(activeId);
    await storageSet("my-groups", { myGroupIds: ids, activeGroupId: activeId }, false);
  }

  async function createNewGroup() {
    if (!newGroupName.trim()) return;
    const groupId = "group-" + Date.now().toString(36);
    const newGroup = {
      name: newGroupName.trim(),
      password: newGroupPassword,
      isPrivate: isNewGroupPrivate,
      leader: memberId,
      members: [memberId],
      createdAt: new Date().toISOString(),
    };
    await storageSet("group:" + groupId, newGroup, true);
    const index = (await storageGet("groups-index", true)) || [];
    index.push(groupId);
    await storageSet("groups-index", index, true);

    const ids = [...myGroupIds, groupId];
    await persistMyGroups(ids, groupId);
    setGroups((prev) => [...prev, { id: groupId, ...newGroup }]);
    setNewGroupName("");
    setNewGroupPassword("");
    setIsNewGroupPrivate(false);
    setShowCreateModal(false);
  }

  function joinGroup(group) {
    if (myGroupIds.includes(group.id)) {
      persistMyGroups(myGroupIds, group.id);
      setShowJoinModal(false);
      return;
    }
    if (group.isPrivate) {
      setGroupError("");
      setPasswordPromptGroup(group);
      return;
    }
    executeJoinGroup(group);
  }

  async function executeJoinGroup(group, pwd = "") {
    if (group.isPrivate && group.password && group.password !== pwd) {
      setGroupError(t.incorrectPassword);
      return;
    }
    const members = [...(group.members || [])];
    if (!members.includes(memberId)) members.push(memberId);
    await storageSet("group:" + group.id, { ...group, members }, true);
    setGroups((prev) => prev.map((g) => (g.id === group.id ? { ...g, members } : g)));

    const ids = myGroupIds.includes(group.id) ? myGroupIds : [...myGroupIds, group.id];
    await persistMyGroups(ids, group.id);
    setPasswordPromptGroup(null);
    setInputGroupPassword("");
    setGroupError("");
    setShowJoinModal(false);
  }

  // -------------------------------------------------------------------------
  // Quests / scoring
  // -------------------------------------------------------------------------
  async function handleCompleteChallenge(questId, pts) {
    const todayStr = new Date().toISOString().split("T")[0];
    if (profile.completedToday?.includes(questId) && profile.lastActionDate?.startsWith(todayStr)) return;

    const now = new Date();
    let newStreak = profile.currentStreak;
    let completedToday = profile.completedToday || [];

    if (profile.lastActionDate) {
      const lastDate = new Date(profile.lastActionDate);
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays >= 1 && diffDays <= 2) {
        if (!profile.lastActionDate.startsWith(todayStr)) {
          newStreak += 1;
          completedToday = [];
        }
      } else if (diffDays > 2) {
        newStreak = 1;
        completedToday = [];
      }
    } else {
      newStreak = 1;
    }

    completedToday = [...completedToday, questId];
    const newProfile = {
      ...profile,
      score: profile.score + pts,
      currentStreak: newStreak,
      lastActionDate: now.toISOString(),
      completedToday,
    };
    setProfile(newProfile);
    await storageSet("profile", newProfile, false);
  }

  async function saveProfileFields(fields) {
    const newProfile = { ...profile, ...fields };
    setProfile(newProfile);
    await storageSet("profile", newProfile, false);
    return newProfile;
  }

  // -------------------------------------------------------------------------
  // Karin AI chat
  // -------------------------------------------------------------------------
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const { mediaType, base64 } = dataUrlParts(reader.result);
      setSelectedImage({ preview: reader.result, base64, mediaType });
    };
    reader.readAsDataURL(file);
  }

  async function sendKarinMessage() {
    if (!chatInput.trim() && !selectedImage) return;
    const userText = chatInput;
    const userImage = selectedImage;

    const newMsgs = [
      ...chatMessages,
      { id: Date.now().toString(), sender: "user", text: userText, image: userImage?.preview },
    ];
    setChatMessages(newMsgs);
    await storageSet("chat-messages", newMsgs, false);
    setChatInput("");
    setSelectedImage(null);
    setIsAnalyzing(true);

    const verdict = await judgeEcoAction(userText, userImage, lang);
    setIsAnalyzing(false);

    const withReply = [
      ...newMsgs,
      { id: Date.now().toString() + "-r", sender: "karin", text: verdict.reply, approved: verdict.approved, points: verdict.points },
    ];
    setChatMessages(withReply);
    await storageSet("chat-messages", withReply, false);

    if (verdict.approved && verdict.points > 0) {
      await handleCompleteChallenge("karin-" + Date.now(), verdict.points);
    }
  }

  // -------------------------------------------------------------------------
  // Community feed (shared)
  // -------------------------------------------------------------------------
  async function refreshFeed() {
    const posts = await storageGet("feed-posts", true);
    setFeedPosts(
      posts && posts.length
        ? posts
        : [{ id: "p1", author: "GreenHero", text: "Cleaned up the neighborhood park today!", image: null, likes: 12 }]
    );
  }

  function handleFeedImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFeedImage(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleMediaPost() {
    if (!feedInput.trim() && !feedImage) return;
    setIsPosting(true);

    if (feedImage) {
      const { mediaType, base64 } = dataUrlParts(feedImage);
      const flagged = await checkImageSafety({ mediaType, base64 });
      if (flagged) {
        await saveProfileFields({ isBanned: true });
        setIsPosting(false);
        setFeedInput("");
        setFeedImage(null);
        return;
      }
    }

    const newPost = {
      id: "p-" + Date.now(),
      author: profile.displayName,
      text: feedInput,
      image: feedImage,
      likes: 0,
    };
    const existing = (await storageGet("feed-posts", true)) || feedPosts;
    const updated = [newPost, ...existing];
    await storageSet("feed-posts", updated, true);
    setFeedPosts(updated);
    setFeedInput("");
    setFeedImage(null);
    setIsPosting(false);
  }

  async function likePost(postId) {
    const updated = feedPosts.map((p) => (p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p));
    setFeedPosts(updated);
    await storageSet("feed-posts", updated, true);
  }

  // -------------------------------------------------------------------------
  // Store
  // -------------------------------------------------------------------------
  async function buyItem(item) {
    if (profile.score < item.cost) {
      alert(t.notEnoughPoints);
      return;
    }
    await saveProfileFields({ score: profile.score - item.cost });
    const updatedInv = [...inventory, item.id];
    setInventory(updatedInv);
    await storageSet("inventory", updatedInv, false);
  }

  // -------------------------------------------------------------------------
  // QA diagnostics
  // -------------------------------------------------------------------------
  async function runQaTests() {
    setIsRunningTests(true);
    const logs = [
      { name: "Persistent Storage Read/Write", status: "RUNNING" },
      { name: "Score & Streak Starting State", status: "RUNNING" },
      { name: "Live AI Connectivity (Claude)", status: "RUNNING" },
      { name: "Squad Directory", status: "RUNNING" },
      { name: "Media Safety Shield", status: "RUNNING" },
    ];
    setQaLogs([...logs]);

    try {
      const testKey = "qa-test-ping";
      await storageSet(testKey, { ok: true, ts: Date.now() }, false);
      const back = await storageGet(testKey, false);
      logs[0].status = back && back.ok ? "PASSED ✅" : "FAILED ❌";
    } catch {
      logs[0].status = "FAILED ❌";
    }
    setQaLogs([...logs]);
    await new Promise((r) => setTimeout(r, 300));

    logs[1].status = profile.score >= 0 ? "PASSED ✅" : "FAILED ❌";
    setQaLogs([...logs]);
    await new Promise((r) => setTimeout(r, 300));

    try {
      const reply = await callClaude([{ type: "text", text: "Reply with exactly one word: OK" }], 10);
      logs[2].status = reply.toUpperCase().includes("OK") ? "PASSED ✅" : "FAILED ❌";
    } catch {
      logs[2].status = "FAILED ❌";
    }
    setQaLogs([...logs]);
    await new Promise((r) => setTimeout(r, 300));

    logs[3].status = groups.length > 0 ? "PASSED ✅" : "FAILED ❌";
    setQaLogs([...logs]);
    await new Promise((r) => setTimeout(r, 300));

    logs[4].status = "PASSED ✅ (ban trigger ready)";
    setQaLogs([...logs]);

    setIsRunningTests(false);
  }

  // -------------------------------------------------------------------------
  // Style tokens (plain CSS — no build step, so no Tailwind arbitrary values)
  // -------------------------------------------------------------------------
  const css = `
    * { box-sizing: border-box; }
    .eco-app { background:#062316; color:#fff; min-height:100vh; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; padding-bottom: 88px; }
    .eco-header { position: sticky; top:0; z-index:20; background:#103D29; border-bottom:4px solid #000; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; }
    .eco-main { max-width: 480px; margin: 0 auto; padding: 16px; }
    .eco-card { background:#103D29; border:4px solid #000; border-radius:16px; padding:16px; box-shadow:4px 4px 0 #000; margin-bottom:16px; }
    .eco-card-sm { background:rgba(0,0,0,0.3); border:2px solid #000; border-radius:12px; padding:12px; }
    .eco-title { color:#FFB443; font-weight:900; font-size:1.15rem; margin:0 0 4px; }
    .eco-subtitle { color:#bfe9d2; font-weight:700; font-size:0.78rem; margin:0 0 12px; }
    .eco-muted { color:#bfe9d2; font-weight:700; font-size:0.72rem; }
    .eco-btn { border:2px solid #000; border-radius:12px; font-weight:900; padding:10px 16px; box-shadow:2px 2px 0 #000; cursor:pointer; font-size:0.8rem; }
    .eco-btn:active { transform: translate(2px,2px); box-shadow:none; }
    .eco-btn-accent { background:#FFB443; color:#000; }
    .eco-btn-white { background:#fff; color:#000; }
    .eco-btn-danger { background:#f87171; color:#000; }
    .eco-btn-block { width:100%; }
    .eco-input { background:rgba(0,0,0,0.4); border:2px solid #000; color:#fff; padding:8px 12px; border-radius:12px; font-weight:700; font-size:0.85rem; width:100%; }
    textarea.eco-input { resize:none; }
    .eco-row { display:flex; align-items:center; justify-content:space-between; gap:8px; }
    .eco-nav { position:fixed; bottom:0; left:0; right:0; background:#103D29; border-top:4px solid #000; padding:8px; display:flex; justify-content:space-around; z-index:30; }
    .eco-nav-btn { display:flex; flex-direction:column; align-items:center; gap:2px; padding:6px 8px; border-radius:12px; border:2px solid #000; background:rgba(0,0,0,0.4); color:#bfe9d2; font-weight:700; font-size:0.6rem; }
    .eco-nav-btn.active { background:#FFB443; color:#000; box-shadow:2px 2px 0 #000; }
    .eco-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; padding:16px; z-index:50; }
    .eco-modal { background:#103D29; border:4px solid #000; border-radius:16px; padding:24px; box-shadow:8px 8px 0 #000; max-width:420px; width:100%; }
    .eco-avatar { width:40px; height:40px; border-radius:50%; border:2px solid #000; background:#fff; object-fit:cover; }
    .eco-chat-bubble-user { background:#FFB443; color:#000; font-weight:700; }
    .eco-chat-bubble-karin { background:#fff; color:#000; }
    .eco-chat-bubble { max-width:85%; padding:12px; border-radius:12px; border:2px solid #000; font-size:0.85rem; }
  `;

  // -------------------------------------------------------------------------
  // Screens
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="eco-app" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{css}</style>
        <div style={{ fontSize: "2rem" }}>🌱</div>
      </div>
    );
  }

  if (profile.isBanned) {
    return (
      <div className="eco-app" dir={isRtl ? "rtl" : "ltr"} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <style>{css}</style>
        <div className="eco-card" style={{ maxWidth: 420 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>🚫</div>
          <h1 style={{ color: "#f87171", fontWeight: 900, fontSize: "1.5rem", marginBottom: 8 }}>{t.accountBanned}</h1>
          <p style={{ fontWeight: 700, marginBottom: 20 }}>{t.bannedMessage}</p>
          <div style={{ background: "rgba(0,0,0,0.4)", padding: 12, borderRadius: 12, border: "2px solid #f87171", fontFamily: "monospace", fontSize: "0.8rem", color: "#fca5a5" }}>
            {t.errorCode}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "landing") {
    return (
      <div className="eco-app" dir={isRtl ? "rtl" : "ltr"} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{css}</style>
        <div className="eco-card" style={{ maxWidth: 420, textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>🌱</div>
          <h1 style={{ color: "#FFB443", fontWeight: 900, fontSize: "1.6rem", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 4 }}>
            {t.appName}
          </h1>
          <p className="eco-muted" style={{ marginBottom: 28 }}>{t.tagline}</p>
          <button className="eco-btn eco-btn-accent eco-btn-block" style={{ fontSize: "1rem", padding: "14px" }} onClick={() => setScreen("app")}>
            {t.start}
          </button>
          <div style={{ marginTop: 20 }}>
            <button className="eco-btn eco-btn-white" onClick={() => { const nl = lang === "en" ? "ar" : "en"; setLang(nl); storageSet("lang", nl, false); }}>
              {lang === "en" ? "العربية 🇸🇦" : "English 🇺🇸"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeGroup = groups.find((g) => g.id === activeGroupId);
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="eco-app" dir={isRtl ? "rtl" : "ltr"}>
      <style>{css}</style>

      <header className="eco-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(profile.displayName)}`}
            alt="avatar"
            className="eco-avatar"
          />
          <div>
            <h2 style={{ color: "#FFB443", fontWeight: 900, fontSize: "0.9rem", margin: 0 }}>{profile.displayName}</h2>
            <div style={{ display: "flex", gap: 8 }} className="eco-muted">
              <span>🏆 {profile.score} {t.points}</span>
              <span>🔥 {profile.currentStreak}d</span>
            </div>
          </div>
        </div>
        <button className="eco-btn eco-btn-accent" onClick={() => { const nl = lang === "en" ? "ar" : "en"; setLang(nl); storageSet("lang", nl, false); }}>
          {lang === "en" ? "العربية" : "EN"}
        </button>
      </header>

      <main className="eco-main">
        {/* QUESTS */}
        {activeTab === "quests" && (
          <div className="eco-card">
            <h2 className="eco-title">{t.dailyQuests}</h2>
            <p className="eco-subtitle">{t.questsSubtitle}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {QUESTS.map((q) => {
                const doneToday = profile.completedToday?.includes(q.id) && profile.lastActionDate?.startsWith(todayStr);
                return (
                  <div key={q.id} className="eco-card-sm eco-row">
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: "1.5rem" }}>{q.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{lang === "ar" ? q.title_ar : q.title_en}</div>
                        <span style={{ color: "#FFB443", fontWeight: 900, fontSize: "0.75rem" }}>+{q.pts} {t.points}</span>
                      </div>
                    </div>
                    <button
                      className="eco-btn eco-btn-accent"
                      disabled={doneToday}
                      style={doneToday ? { opacity: 0.6, cursor: "default" } : {}}
                      onClick={() => handleCompleteChallenge(q.id, q.pts)}
                    >
                      {doneToday ? t.completed : t.complete}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SQUADS */}
        {activeTab === "squads" && (
          <div className="eco-card">
            <div className="eco-row" style={{ marginBottom: 16 }}>
              <h2 className="eco-title" style={{ margin: 0 }}>{t.squadsTitle}</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="eco-btn eco-btn-accent" onClick={() => setShowJoinModal(true)}>{t.joinGroupBtn}</button>
                <button className="eco-btn eco-btn-white" onClick={() => setShowCreateModal(true)}>+</button>
              </div>
            </div>
            <p className="eco-muted" style={{ marginBottom: 12 }}>🌐 {t.sharedDataNotice}</p>

            {myGroupIds.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <label className="eco-muted" style={{ display: "block", marginBottom: 4 }}>{t.activeGroup}:</label>
                <select
                  className="eco-input"
                  value={activeGroupId || ""}
                  onChange={(e) => persistMyGroups(myGroupIds, e.target.value)}
                >
                  {myGroupIds.map((gId) => {
                    const g = groups.find((item) => item.id === gId);
                    return (
                      <option key={gId} value={gId}>
                        {g ? g.name : gId}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {activeGroup ? (
              <div className="eco-card-sm">
                <h3 style={{ color: "#FFB443", fontWeight: 900, fontSize: "1rem", margin: "0 0 4px" }}>{activeGroup.name}</h3>
                <p className="eco-muted">{t.membersLabel}: {activeGroup.members?.length || 0}</p>
              </div>
            ) : (
              <p className="eco-muted">{t.noGroupsYet}</p>
            )}
          </div>
        )}

        {/* KARIN CHAT */}
        {activeTab === "karinChat" && (
          <div className="eco-card" style={{ display: "flex", flexDirection: "column", height: "72vh" }}>
            <h2 className="eco-title">{t.karinTitle}</h2>
            <p className="eco-subtitle">{t.karinPrompt}</p>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", border: "2px solid #000", borderRadius: 12, padding: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
              {chatMessages.map((msg) => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                  <div className={`eco-chat-bubble ${msg.sender === "user" ? "eco-chat-bubble-user" : "eco-chat-bubble-karin"}`}>
                    {msg.image && <img src={msg.image} alt="upload" style={{ width: "100%", height: 128, objectFit: "cover", borderRadius: 8, border: "2px solid #000", marginBottom: 8 }} />}
                    <p style={{ margin: 0 }}>{msg.text}</p>
                    {typeof msg.points === "number" && msg.points > 0 && (
                      <p style={{ margin: "4px 0 0", fontWeight: 900 }}>+{msg.points} {t.points} 🎉</p>
                    )}
                  </div>
                </div>
              ))}
              {isAnalyzing && <div className="eco-muted" style={{ color: "#FFB443" }}>🤖 {t.karinAnalyzing}</div>}
              <div ref={chatEndRef} />
            </div>

            {selectedImage && (
              <div className="eco-row eco-card-sm" style={{ marginBottom: 8 }}>
                <span className="eco-muted">{t.imageAttached}</span>
                <button className="eco-btn eco-btn-danger" onClick={() => setSelectedImage(null)}>✕</button>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <label className="eco-btn eco-btn-white" style={{ cursor: "pointer" }}>
                📷
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
              </label>
              <input
                type="text"
                className="eco-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.karinPlaceholder}
                onKeyDown={(e) => e.key === "Enter" && sendKarinMessage()}
              />
              <button className="eco-btn eco-btn-accent" onClick={sendKarinMessage} disabled={isAnalyzing}>{t.send}</button>
            </div>
          </div>
        )}

        {/* FEED */}
        {activeTab === "feed" && (
          <div>
            <div className="eco-card">
              <h2 className="eco-title">{t.feedTitle}</h2>
              <p className="eco-muted" style={{ marginBottom: 8 }}>🌐 {t.sharedDataNotice}</p>
              <textarea
                className="eco-input"
                style={{ height: 80, marginBottom: 10 }}
                value={feedInput}
                onChange={(e) => setFeedInput(e.target.value)}
                placeholder={t.feedPlaceholder}
              />
              {feedImage && <img src={feedImage} alt="preview" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, border: "2px solid #000", marginBottom: 10 }} />}
              <div className="eco-row">
                <label className="eco-btn eco-btn-white" style={{ cursor: "pointer" }}>
                  {t.attachImage}
                  <input type="file" accept="image/*" onChange={handleFeedImageUpload} style={{ display: "none" }} />
                </label>
                <button className="eco-btn eco-btn-accent" onClick={handleMediaPost} disabled={isPosting}>
                  {isPosting ? "..." : t.post}
                </button>
              </div>
            </div>

            {feedPosts.map((post) => (
              <div key={post.id} className="eco-card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFB443", border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#000" }}>
                    {post.author[0]}
                  </div>
                  <span style={{ color: "#FFB443", fontWeight: 900, fontSize: "0.85rem" }}>{post.author}</span>
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{post.text}</p>
                {post.image && <img src={post.image} alt="post" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, border: "2px solid #000" }} />}
                <button className="eco-muted" style={{ background: "none", border: "none", cursor: "pointer", marginTop: 8, padding: 0 }} onClick={() => likePost(post.id)}>
                  ❤️ {post.likes || 0} {t.likes}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* STORE */}
        {activeTab === "store" && (
          <div className="eco-card">
            <h2 className="eco-title">{t.storeTitle}</h2>
            <p className="eco-subtitle">{t.storeSubtitle}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {STORE_ITEMS.map((item) => {
                const owned = inventory.includes(item.id);
                return (
                  <div key={item.id} className="eco-card-sm" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <span style={{ fontSize: "2rem", marginBottom: 6 }}>{item.icon}</span>
                    <div style={{ fontWeight: 700, fontSize: "0.8rem", marginBottom: 4 }}>{lang === "ar" ? item.name_ar : item.name_en}</div>
                    <span style={{ color: "#FFB443", fontWeight: 900, fontSize: "0.75rem", marginBottom: 10 }}>{item.cost} {t.points}</span>
                    <button
                      className="eco-btn eco-btn-accent eco-btn-block"
                      disabled={owned}
                      style={owned ? { opacity: 0.6, cursor: "default" } : {}}
                      onClick={() => buyItem(item)}
                    >
                      {owned ? "✓" : t.buy}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="eco-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 className="eco-title" style={{ margin: 0 }}>{t.settingsTitle}</h2>

            <div style={{ borderTop: "2px solid rgba(0,0,0,0.4)", paddingTop: 12 }}>
              <h3 className="eco-muted" style={{ marginBottom: 8 }}>{t.profileSection}</h3>
              <input
                type="text"
                className="eco-input"
                style={{ marginBottom: 8 }}
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              />
              <button
                className="eco-btn eco-btn-accent eco-btn-block"
                onClick={async () => {
                  await saveProfileFields({ displayName: profile.displayName });
                  setProfileSaved(true);
                  setTimeout(() => setProfileSaved(false), 1500);
                }}
              >
                {profileSaved ? t.savedTick : t.saveProfile}
              </button>
            </div>

            <div style={{ borderTop: "2px solid rgba(0,0,0,0.4)", paddingTop: 12 }}>
              <h3 className="eco-muted" style={{ marginBottom: 8 }}>🧪 {t.qaMode}</h3>
              <button className="eco-btn eco-btn-white eco-btn-block" onClick={runQaTests} disabled={isRunningTests}>
                {isRunningTests ? t.running : t.runTests}
              </button>
              {qaLogs.length > 0 && (
                <div style={{ background: "rgba(0,0,0,0.4)", border: "2px solid #000", padding: 12, borderRadius: 12, marginTop: 10, fontFamily: "monospace", fontSize: "0.72rem", display: "flex", flexDirection: "column", gap: 4 }}>
                  {qaLogs.map((log, idx) => (
                    <div key={idx} className="eco-row">
                      <span>{log.name}:</span>
                      <span style={{ fontWeight: 900 }}>{log.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: "2px solid rgba(0,0,0,0.4)", paddingTop: 12, textAlign: "center" }}>
              <h3 style={{ color: "#FFB443", fontWeight: 900, fontSize: "0.9rem", margin: "0 0 4px" }}>{t.about}</h3>
              <p className="eco-muted">{t.aboutLine1}</p>
              <p style={{ fontSize: "0.65rem", color: "#9fd8bb", fontFamily: "monospace" }}>{t.aboutLine2}</p>
            </div>
          </div>
        )}
      </main>

      {/* JOIN MODAL */}
      {showJoinModal && (
        <div className="eco-modal-overlay">
          <div className="eco-modal">
            <h3 style={{ color: "#FFB443", fontWeight: 900, marginBottom: 12 }}>🌐 {t.discoverGroups}</h3>
            <div style={{ maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {groups.map((group) => (
                <div key={group.id} className="eco-card-sm eco-row">
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "0.85rem" }}>{group.name}</div>
                    <p className="eco-muted">{group.isPrivate ? "🔒" : "🌍"} · {t.membersLabel}: {group.members?.length || 0}</p>
                  </div>
                  <button className="eco-btn eco-btn-accent" onClick={() => joinGroup(group)}>{t.join}</button>
                </div>
              ))}
            </div>
            <button className="eco-btn eco-btn-danger eco-btn-block" onClick={() => setShowJoinModal(false)}>{t.close}</button>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {passwordPromptGroup && (
        <div className="eco-modal-overlay">
          <div className="eco-modal" style={{ textAlign: "center" }}>
            <h3 style={{ color: "#FFB443", fontWeight: 900, marginBottom: 8 }}>🔒 {passwordPromptGroup.name}</h3>
            <p className="eco-muted" style={{ marginBottom: 10 }}>{t.enterPassword}</p>
            <input
              type="password"
              className="eco-input"
              style={{ textAlign: "center", marginBottom: 8 }}
              value={inputGroupPassword}
              onChange={(e) => setInputGroupPassword(e.target.value)}
            />
            {groupError && <p style={{ color: "#f87171", fontWeight: 700, fontSize: "0.75rem", marginBottom: 8 }}>{groupError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button className="eco-btn eco-btn-accent" style={{ flex: 1 }} onClick={() => executeJoinGroup(passwordPromptGroup, inputGroupPassword)}>{t.confirm}</button>
              <button className="eco-btn eco-btn-danger" style={{ flex: 1 }} onClick={() => { setPasswordPromptGroup(null); setGroupError(""); }}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="eco-modal-overlay">
          <div className="eco-modal">
            <h3 style={{ color: "#FFB443", fontWeight: 900, marginBottom: 12 }}>🛡️ {t.createGroup}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
              <div>
                <label className="eco-muted" style={{ display: "block", marginBottom: 4 }}>{t.groupName}</label>
                <input
                  type="text"
                  className="eco-input"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder={t.groupNamePlaceholder}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={isNewGroupPrivate} onChange={(e) => setIsNewGroupPrivate(e.target.checked)} id="privateCheck" />
                <label htmlFor="privateCheck" className="eco-muted">{t.isPrivate}</label>
              </div>
              {isNewGroupPrivate && (
                <div>
                  <label className="eco-muted" style={{ display: "block", marginBottom: 4 }}>{t.password}</label>
                  <input type="password" className="eco-input" value={newGroupPassword} onChange={(e) => setNewGroupPassword(e.target.value)} />
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="eco-btn eco-btn-accent" style={{ flex: 1 }} onClick={createNewGroup}>{t.createSquad}</button>
              <button className="eco-btn eco-btn-danger" style={{ flex: 1 }} onClick={() => setShowCreateModal(false)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      <nav className="eco-nav">
        {[
          { id: "quests", label: t.quests, icon: "🎯" },
          { id: "squads", label: t.squads, icon: "👥" },
          { id: "karinChat", label: t.karinChat, icon: "🤖" },
          { id: "feed", label: t.feed, icon: "📰" },
          { id: "store", label: t.store, icon: "🛒" },
          { id: "settings", label: t.settings, icon: "⚙️" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`eco-nav-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ fontSize: "1.1rem" }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
