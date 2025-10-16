import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Users, Home, Clock, Menu, X, LogOut, ChevronRight, Globe, ChevronLeft, Utensils, Search, Trophy, Send } from 'lucide-react';

const KublerRacingApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [selectedYard, setSelectedYard] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [messageLanguage, setMessageLanguage] = useState('english');
  const [userLanguage, setUserLanguage] = useState('english');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [upcomingRaces, setUpcomingRaces] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedYard && !upcomingRaces[selectedYard.id]) {
      setUpcomingRaces(prev => ({
        ...prev,
        [selectedYard.id]: generateUpcomingRaces(selectedYard.id)
      }));
    }
    // Also generate races for yard 1 when owner logs in
    if (userType === 'owner' && !upcomingRaces[1]) {
      setUpcomingRaces(prev => ({
        ...prev,
        1: generateUpcomingRaces(1),
        2: generateUpcomingRaces(2)
      }));
    }
  }, [selectedYard, userType]);

  const t = (key) => {
    const translations = {
      english: {
        welcomeBack: 'Welcome,',
        quickActions: 'Quick Actions',
        myRota: 'My Rota',
        myFeedingSchedule: 'My Feeding Schedule',
        upcomingRaces: 'Upcoming Races',
        messages: 'Messages',
        dayOff: 'Day Off',
        prep: 'Prep:',
        preparing: 'Preparing:',
        riding: 'Riding:',
        stable: 'Stable:',
        morning: 'Morning',
        afternoon: 'Afternoon',
        medication: 'Medication:',
        replyTo: 'Reply to Clare Kubler',
        typeMessage: 'Type your message...',
        sendToManager: 'Send to Manager',
        home: 'Home',
        rota: 'Rota',
        feed: 'Feed',
        races: 'Races',
        class: 'Class',
        distance: 'Distance',
        confirmed: 'Confirmed',
        entered: 'Entered',
        language: 'Language'
      },
      arabic: {
        welcomeBack: 'مرحبا،',
        quickActions: 'إجراءات سريعة',
        myRota: 'جدول عملي',
        myFeedingSchedule: 'جدول التغذية الخاص بي',
        upcomingRaces: 'السباقات القادمة',
        messages: 'الرسائل',
        dayOff: 'يوم عطلة',
        prep: 'التحضير:',
        preparing: 'التحضير:',
        riding: 'الركوب:',
        stable: 'الإسطبل:',
        morning: 'الصباح',
        afternoon: 'بعد الظهر',
        medication: 'الدواء:',
        replyTo: 'الرد على كلير كوبلر',
        typeMessage: 'اكتب رسالتك...',
        sendToManager: 'إرسال إلى المدير',
        home: 'الرئيسية',
        rota: 'الجدول',
        feed: 'التغذية',
        races: 'السباقات',
        class: 'الفئة',
        distance: 'المسافة',
        confirmed: 'مؤكد',
        entered: 'مسجل',
        language: 'اللغة'
      },
      hindi: {
        welcomeBack: 'स्वागत है,',
        quickActions: 'त्वरित कार्य',
        myRota: 'मेरी ड्यूटी',
        myFeedingSchedule: 'मेरा भोजन कार्यक्रम',
        upcomingRaces: 'आगामी दौड़',
        messages: 'संदेश',
        dayOff: 'छुट्टी का दिन',
        prep: 'तैयारी:',
        preparing: 'तैयारी:',
        riding: 'सवारी:',
        stable: 'अस्तबल:',
        morning: 'सुबह',
        afternoon: 'दोपहर',
        medication: 'दवा:',
        replyTo: 'क्लेयर कुब्लर को जवाब दें',
        typeMessage: 'अपना संदेश टाइप करें...',
        sendToManager: 'प्रबंधक को भेजें',
        home: 'होम',
        rota: 'ड्यूटी',
        feed: 'भोजन',
        races: 'दौड़',
        class: 'श्रेणी',
        distance: 'दूरी',
        confirmed: 'पुष्टि',
        entered: 'दर्ज',
        language: 'भाषा'
      }
    };
    return translations[userLanguage]?.[key] || key;
  };

  const yards = [
    { id: 1, name: 'Berkshire Yard', location: 'Berkshire, UK', horses: 50, totalRiders: 6, totalGroomsmen: 10 },
    { id: 2, name: 'Bahrain Royal Yard', location: 'Bahrain', horses: 75, totalRiders: 10, totalGroomsmen: 18 }
  ];

  const horseOwners = [
    { id: 'ho1', name: 'Gary Middlebrook', horses: ['Silver Star', 'Golden Arrow', 'Thunder Strike', 'Royal Pride', 'Midnight Runner'], email: 'gary@example.com' },
    { id: 'ho2', name: 'Sarah Wellington', horses: ['Blue Comet', 'Storm Chaser'], email: 'sarah@example.com' },
    { id: 'ho3', name: 'Ahmed Al-Mansouri', horses: ['Desert Storm', 'Arabian Knight'], email: 'ahmed@example.com' }
  ];

  const generateHorses = (yardId, count) => {
    const names = [
      'Thunder Strike', 'Golden Arrow', 'Midnight Runner', 'Royal Pride', 'Desert Storm',
      'Arabian Knight', 'Sand Dancer', 'Silver Star', 'Blue Comet', 'Storm Chaser',
      'Wind Runner', 'Royal Pearl', 'Lightning Bolt', 'Crimson Flash', 'Emerald Dream',
      'Shadow Dancer', 'Mystic Moon', 'Phoenix Rising', 'Diamond Sky', 'Velvet Thunder'
    ];
    
    const feeds = [
      { name: 'Alfa-A Oil', time: '06:00' },
      { name: 'Hi-Fi Molasses Free', time: '06:00' },
      { name: 'Racing Mix', time: '18:00' },
      { name: 'Competition Mix', time: '18:00' }
    ];

    const medications = [
      'None',
      'Bute (Phenylbutazone) - 1g twice daily',
      'Gastrogard - 1 tube daily',
      'NAF Respirator Boost - 60ml daily',
      'MSM Joint Supplement - 30g daily',
      'None'
    ];
    
    return Array.from({length: count}, (_, i) => ({
      id: `${yardId}-h${i}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i/names.length) + 1}` : ''),
      age: 3 + (i % 5),
      stable: `A${i + 1}`,
      status: ['Ready', 'Training', 'Rest'][i % 3],
      morningFeed: feeds[i % 2],
      afternoonFeed: feeds[2 + (i % 2)],
      medication: medications[i % medications.length],
      owner: horseOwners[i % horseOwners.length].name
    }));
  };

  const horses = {
    1: generateHorses(1, 50),
    2: generateHorses(2, 75)
  };

  const riders = {
    1: [
      { id: 'r1', name: 'James Mitchell', language: 'english' },
      { id: 'r2', name: 'Sarah Thompson', language: 'english' },
      { id: 'r3', name: 'David Clarke', language: 'english' },
      { id: 'r4', name: 'Emma Wilson', language: 'english' },
      { id: 'r5', name: 'Michael Brown', language: 'english' },
      { id: 'r6', name: 'Sophie Davies', language: 'english' }
    ],
    2: [
      { id: 'r7', name: 'Ahmed Al-Rashid', language: 'arabic' },
      { id: 'r8', name: 'Fatima Hassan', language: 'arabic' },
      { id: 'r9', name: 'Mohammed Al-Said', language: 'arabic' },
      { id: 'r10', name: 'Layla Ibrahim', language: 'arabic' },
      { id: 'r11', name: 'Khalid Rahman', language: 'arabic' },
      { id: 'r12', name: 'Amina Yousef', language: 'arabic' },
      { id: 'r13', name: 'Rajesh Kumar', language: 'hindi' },
      { id: 'r14', name: 'Priya Sharma', language: 'hindi' },
      { id: 'r15', name: 'Deepak Patel', language: 'hindi' },
      { id: 'r16', name: 'Sunita Gupta', language: 'hindi' }
    ]
  };

  const groomsmen = {
    1: [
      { id: 'g1', name: 'Tom Roberts', language: 'english' },
      { id: 'g2', name: 'Jack Davis', language: 'english' },
      { id: 'g3', name: 'Oliver Smith', language: 'english' },
      { id: 'g4', name: 'Harry Johnson', language: 'english' },
      { id: 'g5', name: 'George Williams', language: 'english' },
      { id: 'g6', name: 'Charlie Taylor', language: 'english' },
      { id: 'g7', name: 'William Anderson', language: 'english' },
      { id: 'g8', name: 'James White', language: 'english' },
      { id: 'g9', name: 'Thomas Martin', language: 'english' },
      { id: 'g10', name: 'Joshua Lee', language: 'english' }
    ],
    2: [
      { id: 'g11', name: 'Hassan Ali', language: 'arabic' },
      { id: 'g12', name: 'Ali Hassan', language: 'arabic' },
      { id: 'g13', name: 'Omar Khalid', language: 'arabic' },
      { id: 'g14', name: 'Yusuf Ahmed', language: 'arabic' },
      { id: 'g15', name: 'Ibrahim Rashid', language: 'arabic' },
      { id: 'g16', name: 'Abdullah Mahmoud', language: 'arabic' },
      { id: 'g17', name: 'Anil Verma', language: 'hindi' },
      { id: 'g18', name: 'Suresh Reddy', language: 'hindi' },
      { id: 'g19', name: 'Manoj Singh', language: 'hindi' },
      { id: 'g20', name: 'Vijay Rao', language: 'hindi' },
      { id: 'g21', name: 'Ramesh Iyer', language: 'hindi' },
      { id: 'g22', name: 'Kiran Nair', language: 'hindi' },
      { id: 'g23', name: 'Ashok Kumar', language: 'hindi' },
      { id: 'g24', name: 'Sanjay Pillai', language: 'hindi' },
      { id: 'g25', name: 'Amit Joshi', language: 'hindi' },
      { id: 'g26', name: 'Prakash Menon', language: 'hindi' },
      { id: 'g27', name: 'Dinesh Krishnan', language: 'hindi' },
      { id: 'g28', name: 'Ravi Shankar', language: 'hindi' }
    ]
  };

  const getWorkingStaff = (yardId, date, staffList, workingCount) => {
    const dateStr = date.toISOString().split('T')[0];
    const timeSeed = Date.now();
    const seed = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + timeSeed + refreshKey;
    const shuffled = [...staffList].sort((a, b) => {
      const aHash = (seed + a.id.charCodeAt(0) * 7) % 100;
      const bHash = (seed + b.id.charCodeAt(0) * 7) % 100;
      return aHash - bHash;
    });
    return {
      working: shuffled.slice(0, workingCount),
      off: shuffled.slice(workingCount)
    };
  };

  const generateRota = (yardId, date) => {
    if (yardId === 1) {
      const slots = ['07:30', '09:00', '11:00', '13:00', '14:30'];
      const riderStaff = getWorkingStaff(yardId, date, riders[1], Math.ceil(riders[1].length * 0.8));
      const groomStaff = getWorkingStaff(yardId, date, groomsmen[1], Math.ceil(groomsmen[1].length * 0.8));
      
      let horseIndex = 0;
      const sessions = [];
      
      slots.forEach((time) => {
        if (horseIndex < 50) {
          const sessionHorses = horses[1].slice(horseIndex, horseIndex + 4);
          const sessionRiders = sessionHorses.map((horse, idx) => ({
            rider: riderStaff.working[idx % riderStaff.working.length],
            horse: horse
          }));
          const sessionGrooms = sessionHorses.map((horse, idx) => ({
            groom: groomStaff.working[idx % groomStaff.working.length],
            horse: horse
          }));
          
          sessions.push({
            time,
            riderAssignments: sessionRiders,
            groomAssignments: sessionGrooms,
            prepTime: time.split(':').map(Number).reduce((h, m) => h * 60 + m) - 15
          });
          
          horseIndex += 4;
        }
      });
      
      return { sessions, workingRiders: riderStaff.working, offRiders: riderStaff.off, workingGrooms: groomStaff.working, offGrooms: groomStaff.off };
    } else {
      const morningSlots = ['03:00', '04:30', '06:00', '07:30', '09:00'];
      const eveningSlots = ['16:30', '18:00', '19:30', '21:00'];
      const allSlots = [...morningSlots, ...eveningSlots];
      
      const riderStaff = getWorkingStaff(yardId, date, riders[2], Math.ceil(riders[2].length * 0.8));
      const groomStaff = getWorkingStaff(yardId, date, groomsmen[2], Math.ceil(groomsmen[2].length * 0.8));
      
      let horseIndex = 0;
      const sessions = [];
      
      allSlots.forEach((time) => {
        if (horseIndex < 75) {
          const sessionHorses = horses[2].slice(horseIndex, horseIndex + 4);
          const sessionRiders = sessionHorses.map((horse, idx) => ({
            rider: riderStaff.working[idx % riderStaff.working.length],
            horse: horse
          }));
          const sessionGrooms = sessionHorses.map((horse, idx) => ({
            groom: groomStaff.working[idx % groomStaff.working.length],
            horse: horse
          }));
          
          sessions.push({
            time,
            riderAssignments: sessionRiders,
            groomAssignments: sessionGrooms,
            prepTime: time.split(':').map(Number).reduce((h, m) => h * 60 + m) - 15
          });
          
          horseIndex += 4;
        }
      });
      
      return { sessions, workingRiders: riderStaff.working, offRiders: riderStaff.off, workingGrooms: groomStaff.working, offGrooms: groomStaff.off };
    }
  };

  const formatPrepTime = (prepTimeMinutes) => {
    let mins = prepTimeMinutes;
    if (mins < 0) mins += 24 * 60;
    const hours = Math.floor(mins / 60) % 24;
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const generateUpcomingRaces = (yardId) => {
    const racecourses = yardId === 1 
      ? ['Ascot', 'Newmarket', 'Epsom', 'Cheltenham', 'Goodwood']
      : ['Meydan', 'Abu Dhabi', 'Jebel Ali'];
    
    const races = [];
    const today = new Date();
    
    // Add specific races for Gary's horses
    if (yardId === 1) {
      // Silver Star race
      const silverStarDate = new Date(today);
      silverStarDate.setDate(today.getDate() + 3);
      races.push({
        date: silverStarDate,
        horse: horses[1].find(h => h.name === 'Silver Star'),
        racecourse: 'Ascot',
        time: '14:30',
        status: 'Confirmed',
        distance: '1m 2f',
        class: 'Class 1'
      });
      
      // Golden Arrow race
      const goldenArrowDate = new Date(today);
      goldenArrowDate.setDate(today.getDate() + 7);
      races.push({
        date: goldenArrowDate,
        horse: horses[1].find(h => h.name === 'Golden Arrow'),
        racecourse: 'Newmarket',
        time: '15:15',
        status: 'Confirmed',
        distance: '1m',
        class: 'Class 2'
      });
    }
    
    for (let day = 0; day < 14; day++) {
      const raceDate = new Date(today);
      raceDate.setDate(today.getDate() + day);
      
      const numRaces = Math.floor(Math.random() * 3);
      
      for (let r = 0; r < numRaces; r++) {
        const horseList = horses[yardId];
        const randomHorse = horseList[Math.floor(Math.random() * horseList.length)];
        const racecourse = racecourses[Math.floor(Math.random() * racecourses.length)];
        const hour = 13 + Math.floor(Math.random() * 5);
        const minute = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
        
        races.push({
          date: raceDate,
          horse: randomHorse,
          racecourse: racecourse,
          time: `${hour}:${minute}`,
          status: Math.random() > 0.3 ? 'Confirmed' : 'Entered',
          distance: ['1m', '1m 2f', '1m 4f', '2m'][Math.floor(Math.random() * 4)],
          class: ['Class 1', 'Class 2', 'Class 3'][Math.floor(Math.random() * 3)]
        });
      }
    }
    
    return races;
  };

  const handleLogin = (type) => {
    if (type === 'manager') {
      setCurrentUser({ name: 'Clare Kubler', role: 'Manager' });
      setUserType('manager');
    } else if (type === 'staff') {
      setCurrentUser({ name: 'Hassan Ali', role: 'Groomsman', language: 'arabic', id: 'g11' });
      setUserType('staff');
      setUserLanguage('arabic');
      setSelectedYard(yards[1]);
    } else if (type === 'owner') {
      setCurrentUser({ name: 'Gary Middlebrook', role: 'Horse Owner', horses: ['Silver Star', 'Golden Arrow', 'Thunder Strike', 'Royal Pride', 'Midnight Runner'] });
      setUserType('owner');
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedYard(null);
    setCurrentView('home');
    setUserType(null);
    setUserLanguage('english');
  };

  const selectYard = (yard) => {
    setSelectedYard(yard);
    setCurrentView('home');
    setMenuOpen(false);
  };

  const sendMessage = () => {
    if (messageText && selectedRecipient) {
      alert(`Message sent to ${selectedRecipient}`);
      setMessageText('');
      setSelectedRecipient('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Kubler Racing</h1>
            <p className="text-gray-600 mt-2">Yard Management System</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => handleLogin('manager')} className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold">
              Sign In as Manager
            </button>
            <button onClick={() => handleLogin('staff')} className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold">
              Sign In as Staff
            </button>
            <button onClick={() => handleLogin('owner')} className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold">
              Sign In as Horse Owner
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'owner') {
    const allHorses = [...horses[1], ...horses[2]];
    const myHorses = currentUser.horses.map(ownerHorse => 
      allHorses.find(h => h.name === ownerHorse)
    ).filter(Boolean);
    
    const allRaces = [...(upcomingRaces[1] || []), ...(upcomingRaces[2] || [])];
    const myRaces = allRaces.filter(race => 
      currentUser.horses.some(ownerHorse => race.horse.name === ownerHorse)
    );

    return (
      <div className="h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
        <div className="bg-purple-700 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Kubler Racing</h1>
              <p className="text-xs">Horse Owner: {currentUser.name}</p>
            </div>
            <button onClick={handleLogout} className="p-2">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {currentView === 'home' && (
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-xl font-bold mb-4">My Horses</h2>
                {myHorses.length === 0 ? (
                  <p className="text-gray-600">No horses found</p>
                ) : (
                  myHorses.map(horse => (
                    <div key={horse.id} className="mb-3 p-3 bg-purple-50 rounded">
                      <p className="font-bold">{horse.name}</p>
                      <p className="text-sm text-gray-600">Stable: {horse.stable}</p>
                      <p className="text-sm text-gray-600">Status: {horse.status}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setCurrentView('races')} className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold">
                    Upcoming Races
                  </button>
                  <button onClick={() => setCurrentView('messages')} className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold">
                    Messages
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'races' && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Upcoming Races</h2>
              {myRaces.length === 0 ? (
                <p className="text-gray-600">No upcoming races</p>
              ) : (
                myRaces.map((race, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-600" />
                      <h3 className="font-bold">{race.horse.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{race.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <p className="text-sm"><strong>{race.racecourse}</strong> - {race.time}</p>
                    <p className="text-sm text-gray-600">{race.distance} • {race.class}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      race.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {race.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {currentView === 'messages' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Clare Kubler</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <p className="text-sm">Your horse Silver Star has been entered for Ascot next week. Looking forward to a great performance!</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h3 className="font-semibold mb-3">Send Message to Clare Kubler</h3>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg h-32 mb-3"
                  placeholder="Type your message..."
                />
                <button onClick={() => {
                  alert('Message sent to Clare Kubler');
                  setMessageText('');
                }} className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold">
                  <Send className="w-4 h-4 inline mr-2" />
                  Send to Manager
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-t">
          <div className="flex justify-around">
            <button onClick={() => setCurrentView('home')} className={`flex-1 flex flex-col items-center py-3 ${currentView === 'home' ? 'text-purple-700' : 'text-gray-500'}`}>
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button onClick={() => setCurrentView('races')} className={`flex-1 flex flex-col items-center py-3 ${currentView === 'races' ? 'text-purple-700' : 'text-gray-500'}`}>
              <Trophy className="w-5 h-5" />
              <span className="text-xs mt-1">Races</span>
            </button>
            <button onClick={() => setCurrentView('messages')} className={`flex-1 flex flex-col items-center py-3 ${currentView === 'messages' ? 'text-purple-700' : 'text-gray-500'}`}>
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs mt-1">Messages</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'staff' && selectedYard) {
    const rota = generateRota(selectedYard.id, selectedDate);
    
    const myRiderSessions = rota.sessions.filter(session => 
      session.riderAssignments.some(ra => ra.rider.id === currentUser.id)
    );
    const myGroomSessions = rota.sessions.filter(session => 
      session.groomAssignments.some(ga => ga.groom.id === currentUser.id)
    );

    const myFeedingHorses = [...new Set([
      ...myGroomSessions.flatMap(s => s.groomAssignments.filter(ga => ga.groom.id === currentUser.id).map(ga => ga.horse))
    ])];

    const currentRaces = upcomingRaces[selectedYard.id] || [];

    return (
      <div className="h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
        <div className="bg-blue-950 text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Kubler Racing</h1>
              <p className="text-xs">{currentUser.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowLanguageSelector(!showLanguageSelector)} className="p-2 hover:bg-blue-900 rounded">
                <Globe className="w-6 h-6" />
              </button>
              <button onClick={handleLogout} className="p-2">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {showLanguageSelector && (
          <div className="bg-white shadow-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">{t('language')}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setUserLanguage('english'); setShowLanguageSelector(false); }}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${userLanguage === 'english' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
              >
                English
              </button>
              <button
                onClick={() => { setUserLanguage('arabic'); setShowLanguageSelector(false); }}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${userLanguage === 'arabic' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
              >
                عربي
              </button>
              <button
                onClick={() => { setUserLanguage('hindi'); setShowLanguageSelector(false); }}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold ${userLanguage === 'hindi' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {currentView === 'home' && (
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-xl font-bold">{t('welcomeBack')} {currentUser.name}</h2>
                <p className="text-gray-600">{selectedYard.name}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">{t('quickActions')}</h3>
                <div className="space-y-3">
                  <button onClick={() => setCurrentView('rota')} className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold">{t('myRota')}</button>
                  <button onClick={() => setCurrentView('feeding')} className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold">{t('myFeedingSchedule')}</button>
                  <button onClick={() => setCurrentView('races')} className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold">{t('upcomingRaces')}</button>
                  <button onClick={() => setCurrentView('messages')} className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold">{t('messages')}</button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'rota' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{t('myRota')}</h2>
              {myGroomSessions.length === 0 && myRiderSessions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600">{t('dayOff')}</p>
                </div>
              ) : (
                rota.sessions.map((session, idx) => {
                  const myGroomAssignments = session.groomAssignments.filter(ga => ga.groom.id === currentUser.id);
                  const myRiderAssignments = session.riderAssignments.filter(ra => ra.rider.id === currentUser.id);
                  
                  if (myGroomAssignments.length === 0 && myRiderAssignments.length === 0) return null;
                  
                  return (
                    <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-4">
                      <div className="flex items-center mb-3 border-b pb-2">
                        <Clock className="w-5 h-5 text-blue-950 mr-2" />
                        <div>
                          <span className="text-lg font-bold">{session.time}</span>
                          <span className="text-xs text-gray-500 block">{t('prep')} {formatPrepTime(session.prepTime)}</span>
                        </div>
                      </div>
                      
                      {myGroomAssignments.length > 0 && (
                        <div className="bg-purple-50 p-3 rounded mb-2">
                          <p className="text-sm font-semibold text-purple-800 mb-2">{t('preparing')}</p>
                          {myGroomAssignments.map((ga, i) => (
                            <div key={i} className="bg-white p-2 rounded mb-2">
                              <p className="font-bold">{ga.horse.name}</p>
                              <p className="text-xs text-gray-600">{t('stable')} {ga.horse.stable}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {myRiderAssignments.length > 0 && (
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-sm font-semibold text-green-800 mb-2">{t('riding')}</p>
                          {myRiderAssignments.map((ra, i) => (
                            <div key={i} className="bg-white p-2 rounded mb-2">
                              <p className="font-bold">{ra.horse.name}</p>
                              <p className="text-xs text-gray-600">{t('stable')} {ra.horse.stable}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {currentView === 'feeding' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{t('myFeedingSchedule')}</h2>
              {myFeedingHorses.map(horse => (
                <div key={horse.id} className="bg-white rounded-lg shadow-md p-4 mb-3">
                  <h3 className="text-lg font-bold">{horse.name}</h3>
                  <p className="text-sm text-gray-600">{t('stable')} {horse.stable}</p>
                  <div className="mt-3 space-y-2">
                    <div className="bg-amber-50 p-2 rounded">
                      <p className="text-sm font-semibold">{t('morning')} - {horse.morningFeed.time}</p>
                      <p className="text-sm">{horse.morningFeed.name}</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="text-sm font-semibold">{t('afternoon')} - {horse.afternoonFeed.time}</p>
                      <p className="text-sm">{horse.afternoonFeed.name}</p>
                    </div>
                    {horse.medication !== 'None' && (
                      <div className="bg-red-50 p-2 rounded">
                        <p className="text-sm font-semibold">{t('medication')}</p>
                        <p className="text-sm">{horse.medication}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentView === 'races' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{t('upcomingRaces')}</h2>
              {Object.entries(currentRaces.reduce((acc, race) => {
                const dateKey = race.date.toDateString();
                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(race);
                return acc;
              }, {})).map(([dateStr, races]) => {
                const date = new Date(dateStr);
                return (
                  <div key={dateStr} className="mb-4">
                    <div className="bg-blue-950 text-white p-3 rounded-t-lg">
                      <p className="font-bold">{date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    </div>
                    <div className="bg-white rounded-b-lg shadow-md">
                      {races.map((race, idx) => (
                        <div key={idx} className="p-4 border-b last:border-b-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-4 h-4 text-amber-600" />
                            <h3 className="font-bold">{race.horse.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{t('stable')} {race.horse.stable}</p>
                          <p className="text-sm"><strong>{race.racecourse}</strong> - {race.time}</p>
                          <p className="text-sm text-gray-600">{race.distance} • {race.class}</p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            race.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {t(race.status === 'Confirmed' ? 'confirmed' : 'entered')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentView === 'messages' && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{t('messages')}</h2>
              <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Clare Kubler</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <p className="text-sm">Please ensure all horses are ready for tomorrows race</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h3 className="font-semibold mb-3">{t('replyTo')}</h3>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg h-32 mb-3"
                  placeholder={t('typeMessage')}
                />
                <button onClick={() => {
                  alert('Message sent to Clare Kubler');
                  setMessageText('');
                }} className="w-full bg-blue-950 text-white py-2 rounded-lg font-semibold">
                  <Send className="w-4 h-4 inline mr-2" />
                  {t('sendToManager')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-t">
          <div className="flex justify-around">
            <button onClick={() => setCurrentView('home')} className={`flex-1 flex flex-col items-center py-2 ${currentView === 'home' ? 'text-blue-950' : 'text-gray-500'}`}>
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">{t('home')}</span>
            </button>
            <button onClick={() => setCurrentView('rota')} className={`flex-1 flex flex-col items-center py-2 ${currentView === 'rota' ? 'text-blue-950' : 'text-gray-500'}`}>
              <Calendar className="w-5 h-5" />
              <span className="text-xs mt-1">{t('rota')}</span>
            </button>
            <button onClick={() => setCurrentView('feeding')} className={`flex-1 flex flex-col items-center py-2 ${currentView === 'feeding' ? 'text-blue-950' : 'text-gray-500'}`}>
              <Utensils className="w-5 h-5" />
              <span className="text-xs mt-1">{t('feed')}</span>
            </button>
            <button onClick={() => setCurrentView('races')} className={`flex-1 flex flex-col items-center py-2 ${currentView === 'races' ? 'text-blue-950' : 'text-gray-500'}`}>
              <Trophy className="w-5 h-5" />
              <span className="text-xs mt-1">{t('races')}</span>
            </button>
            <button onClick={() => setCurrentView('messages')} className={`flex-1 flex flex-col items-center py-2 ${currentView === 'messages' ? 'text-blue-950' : 'text-gray-500'}`}>
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs mt-1">{t('messages')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedYard) {
    return (
      <div className="h-screen bg-gray-100">
        <div className="bg-blue-950 text-white p-4">
          <h1 className="text-2xl font-bold">Kubler Racing - Manager Portal</h1>
          <p className="text-sm">Welcome, {currentUser.name}</p>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Select a Yard</h2>
          {yards.map(yard => (
            <div key={yard.id} onClick={() => selectYard(yard)} className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg">
              <h3 className="text-lg font-bold">{yard.name}</h3>
              <p className="text-gray-600">{yard.location}</p>
              <p className="text-sm text-gray-500 mt-2">{yard.horses} horses • {yard.totalRiders} riders • {yard.totalGroomsmen} groomsmen</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const rota = generateRota(selectedYard.id, selectedDate);
  const currentRaces = upcomingRaces[selectedYard.id] || [];
  const filteredHorses = horses[selectedYard.id].filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
      <div className="bg-blue-950 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{selectedYard.name}</h1>
            <p className="text-xs text-blue-100">{currentUser.name}</p>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-blue-900 rounded">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white shadow-lg">
          <button onClick={() => { setSelectedYard(null); setMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b">
            Switch Yard
          </button>
          <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600">
            Logout
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {currentView === 'home' && (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedYard.name}</h2>
              <p className="text-gray-600 mb-4">{selectedYard.location}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-950">{selectedYard.horses}</p>
                  <p className="text-sm text-gray-600">Horses</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-900">{rota.workingRiders.length}/{selectedYard.totalRiders}</p>
                  <p className="text-sm text-gray-600">Riders On Duty</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-purple-700">{rota.workingGrooms.length}/{selectedYard.totalGroomsmen}</p>
                  <p className="text-sm text-gray-600">Groomsmen On Duty</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-orange-700">{rota.sessions.length}</p>
                  <p className="text-sm text-gray-600">Sessions</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => setCurrentView('rota')} className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900">
                  View Daily Rota
                </button>
                <button onClick={() => setCurrentView('feeding')} className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">
                  Feed Schedule
                </button>
                <button onClick={() => setCurrentView('races')} className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800">
                  Upcoming Races
                </button>
                <button onClick={() => setCurrentView('messages')} className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800">
                  Messages
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'rota' && (
          <div className="p-4">
            <div className="mb-4 bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => changeDate(-1)} className="p-2 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <button onClick={() => changeDate(1)} className="p-2 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Staff Status</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-semibold text-green-700">Riders On Duty: {rota.workingRiders.length}</p>
                  <p className="text-xs text-gray-600">{rota.workingRiders.map(r => r.name).join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-red-700">Riders Day Off: {rota.offRiders.length}</p>
                  <p className="text-xs text-gray-600">{rota.offRiders.map(r => r.name).join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-700">Groomsmen On Duty: {rota.workingGrooms.length}</p>
                  <p className="text-xs text-gray-600">{rota.workingGrooms.map(g => g.name).join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-red-700">Groomsmen Day Off: {rota.offGrooms.length}</p>
                  <p className="text-xs text-gray-600">{rota.offGrooms.map(g => g.name).join(', ')}</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Rota</h2>
            {rota.sessions.map((session, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center mb-3 border-b pb-2">
                  <Clock className="w-5 h-5 text-blue-950 mr-2" />
                  <div>
                    <span className="text-lg font-bold text-gray-800">{session.time}</span>
                    <span className="text-xs text-gray-500 ml-2 block">(Prep from {formatPrepTime(session.prepTime)})</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm font-semibold text-green-800 mb-2">Riding Assignments:</p>
                    {session.riderAssignments.map((ra, raIdx) => (
                      <div key={raIdx} className="flex justify-between items-center mb-2 bg-white p-2 rounded">
                        <div>
                          <p className="text-sm font-semibold">{ra.rider.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{ra.horse.name}</p>
                          <p className="text-xs text-gray-600">{ra.horse.stable}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm font-semibold text-purple-800 mb-2">Preparing Assignments ({formatPrepTime(session.prepTime)}):</p>
                    {session.groomAssignments.map((ga, gaIdx) => (
                      <div key={gaIdx} className="flex justify-between items-center mb-2 bg-white p-2 rounded">
                        <div>
                          <p className="text-sm font-semibold">{ga.groom.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{ga.horse.name}</p>
                          <p className="text-xs text-gray-600">{ga.horse.stable}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'feeding' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Feed Schedule</h2>
            <div className="mb-4 bg-white rounded-lg shadow-md p-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a horse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            {filteredHorses.map(horse => (
              <div key={horse.id} className="bg-white rounded-lg shadow-md p-4 mb-3">
                <div className="border-b pb-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-800">{horse.name}</h3>
                  <p className="text-sm text-gray-600">Stable: {horse.stable}</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-amber-50 p-3 rounded">
                    <div className="flex items-center mb-1">
                      <Utensils className="w-4 h-4 text-amber-700 mr-2" />
                      <p className="text-sm font-semibold text-amber-900">Morning Feed - {horse.morningFeed.time}</p>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">{horse.morningFeed.name}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <div className="flex items-center mb-1">
                      <Utensils className="w-4 h-4 text-orange-700 mr-2" />
                      <p className="text-sm font-semibold text-orange-900">Afternoon Feed - {horse.afternoonFeed.time}</p>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">{horse.afternoonFeed.name}</p>
                  </div>
                  {horse.medication !== 'None' && (
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-sm font-semibold text-red-900 mb-1">Medication:</p>
                      <p className="text-sm text-gray-700">{horse.medication}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'races' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Races</h2>
            {Object.entries(currentRaces.reduce((acc, race) => {
              const dateKey = race.date.toDateString();
              if (!acc[dateKey]) acc[dateKey] = [];
              acc[dateKey].push(race);
              return acc;
            }, {})).map(([dateStr, races]) => {
              const date = new Date(dateStr);
              return (
                <div key={dateStr} className="mb-4">
                  <div className="bg-blue-950 text-white p-3 rounded-t-lg">
                    <p className="font-bold">{date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  </div>
                  <div className="bg-white rounded-b-lg shadow-md">
                    {races.map((race, idx) => (
                      <div key={idx} className="p-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Trophy className="w-4 h-4 text-amber-600" />
                              <h3 className="font-bold text-gray-800">{race.horse.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">Stable: {race.horse.stable}</p>
                            <p className="text-sm text-gray-700 mt-1">
                              <strong>{race.racecourse}</strong> - {race.time}
                            </p>
                            <p className="text-sm text-gray-600">{race.distance} • {race.class}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            race.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {race.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {currentView === 'messages' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient</label>
                <select
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a recipient</option>
                  <option value="GROUP:RIDERS">All Riders (On Duty Today) ({rota.workingRiders.length})</option>
                  <option value="GROUP:GROOMS">All Groomsmen (On Duty Today) ({rota.workingGrooms.length})</option>
                  <option disabled>──────────</option>
                  <optgroup label="Staff">
                    {[...riders[selectedYard.id], ...groomsmen[selectedYard.id]].map(staff => (
                      <option key={staff.id} value={staff.name}>
                        {staff.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Horse Owners">
                    {horseOwners.map(owner => (
                      <option key={owner.id} value={owner.name}>
                        {owner.name} ({owner.horses.join(', ')})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              {selectedRecipient && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Translate to</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMessageLanguage('english')}
                      className={`px-3 py-2 rounded-lg text-sm ${messageLanguage === 'english' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setMessageLanguage('arabic')}
                      className={`px-3 py-2 rounded-lg text-sm ${messageLanguage === 'arabic' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
                    >
                      عربي
                    </button>
                    <button
                      onClick={() => setMessageLanguage('hindi')}
                      className={`px-3 py-2 rounded-lg text-sm ${messageLanguage === 'hindi' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
                    >
                      हिंदी
                    </button>
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                  placeholder="Type your message..."
                />
              </div>
              <button
                onClick={sendMessage}
                className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex-1 flex flex-col items-center py-2 ${currentView === 'home' ? 'text-blue-950' : 'text-gray-500'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('rota')}
            className={`flex-1 flex flex-col items-center py-2 ${currentView === 'rota' ? 'text-blue-950' : 'text-gray-500'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Rota</span>
          </button>
          <button
            onClick={() => setCurrentView('feeding')}
            className={`flex-1 flex flex-col items-center py-2 ${currentView === 'feeding' ? 'text-blue-950' : 'text-gray-500'}`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button
            onClick={() => setCurrentView('races')}
            className={`flex-1 flex flex-col items-center py-2 ${currentView === 'races' ? 'text-blue-950' : 'text-gray-500'}`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs mt-1">Races</span>
          </button>
          <button
            onClick={() => setCurrentView('messages')}
            className={`flex-1 flex flex-col items-center py-2 ${currentView === 'messages' ? 'text-blue-950' : 'text-gray-500'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs mt-1">Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KublerRacingApp;