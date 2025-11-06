'use client';

import { useState } from 'react';
import { MapPin, Gift, Calendar, ShoppingCart, ChevronRight, Leaf, ChevronLeft, ChevronRight as ChevronRightIcon, X } from 'lucide-react';
import Link from 'next/link';

interface QuickAction {
  id: number;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface LearnCard {
  id: number;
  title: string;
  author: string;
  image: string;
  content?: string;
}

export default function HomeScreen() {
  const [userName] = useState('Israel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGiveawayModalOpen, setIsGiveawayModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LearnCard | null>(null);

  const quickActions: QuickAction[] = [
    { 
      id: 1, 
      icon: <Gift className="h-6 w-6 text-[#00A86B]" />, 
      label: 'Give away properties',
      onClick: () => setIsGiveawayModalOpen(true)
    },
    { 
      id: 2, 
      icon: <Calendar className="h-6 w-6 text-[#00A86B]" />, 
      label: 'Schedule Pickup',
      href: '/schedule-pickup'
    },
    { 
      id: 3, 
      icon: <Leaf className="h-6 w-6 text-[#00A86B]" />, 
      label: 'Green Centers',
      href: '/trash-centres'
    },
    { 
      id: 4, 
      icon: <ShoppingCart className="h-6 w-6 text-[#00A86B]" />, 
      label: 'Market Place',
      href: '/marketplace'
    },
  ];

  const learnCards: LearnCard[] = [
    {
      id: 1,
      title: 'Waste Sorting Tips',
      author: 'Jabari',
      image: '/recycling-bins.jpg',
      content: '♻️ Waste Sorting Tips\n\nProper waste sorting helps keep our environment clean, reduces pollution, and allows recyclable materials to be reused efficiently. Follow these simple tips to make a real difference:\n\n🟩 1. Separate Waste at the Source\nAlways keep different types of waste in separate bins:\n• Organic Waste (Green Bin): Food scraps, vegetable peels, leaves, and other biodegradable materials.\n• Recyclables (Blue Bin): Plastic bottles, paper, cardboard, glass, and metal cans.\n• General Waste (Black Bin): Non-recyclable items like dirty tissues, wrappers, or broken ceramics.\n\n🟨 2. Clean Before You Recycle\nRinse bottles, cans, and containers before placing them in the recycling bin. Contaminated recyclables often get rejected.\n\n🟦 3. Avoid Mixing Plastic Types\nNot all plastics are recyclable. Check for recycling codes (1–7) on plastic items and follow your local recycling guide.\n\n🟧 4. Compost Organic Waste\nTurn food leftovers and garden waste into compost for your plants instead of sending them to the landfill.\n\n🟥 5. Keep Hazardous Waste Separate\nBatteries, bulbs, electronics, and chemicals should never go in the regular bin. Drop them off at a designated recycling or collection center.\n\n⚪ 6. Reuse Before You Throw Away\nBefore discarding items, ask yourself if they can be reused—old jars can store grains, and cartons can become plant pots!\n\n🟫 7. Educate and Encourage Others\nHelp your neighbors, schoolmates, or family members understand how to sort waste properly. Small actions create big change when everyone participates.'
    },
    {
      id: 2,
      title: 'Environmental Tips',
      author: 'Ikechukwu Arauh',
      image: '/garbage-bags.jpg',
      content: '🌍 Environmental Tips\n\nProtecting our environment starts with small daily actions. These simple tips can help you live sustainably and make a positive impact on your surroundings:\n\n🍃 1. Save Energy Daily\nTurn off lights and unplug chargers when not in use. Switch to energy-efficient LED bulbs and appliances.\n\n💧 2. Conserve Water\nDon\'t leave taps running unnecessarily. Fix leaks promptly and use buckets instead of hoses for outdoor cleaning.\n\n🚴 3. Choose Eco-Friendly Transport\nWalk, cycle, or use public transport whenever possible to reduce carbon emissions. Carpool with friends to save fuel.\n\n🛍️ 4. Reduce Plastic Use\nCarry reusable shopping bags, bottles, and food containers. Say no to single-use plastics like straws and cutlery.\n\n🌱 5. Plant Trees and Gardens\nTrees clean the air and provide shade. Even a small garden helps improve air quality and supports biodiversity.\n\n♻️ 6. Recycle and Reuse\nSort your waste correctly and support recycling programs in your area. Donate or repurpose old clothes and electronics.\n\n📚 7. Educate and Inspire Others\nShare what you learn about environmental care with your friends, family, and community. Every little bit of awareness helps!'
    },
    {
      id: 3,
      title: 'Composting Guide',
      author: 'Carole .E',
      image: '/composting.jpg',
      content: '🌿 Composting Guide\n\nComposting is an easy and natural way to recycle organic waste into nutrient-rich soil for your plants and gardens. Follow this simple guide to start composting at home:\n\n🍂 1. Choose the Right Compost Bin\nPick a compost bin or create one using wood or plastic. Place it in a shaded, well-drained area.\n\n🥦 2. Know What to Compost\nCompostable materials include:\n• Fruit and vegetable peels\n• Coffee grounds and tea bags\n• Eggshells\n• Grass clippings and dry leaves\n• Shredded paper and cardboard (in moderation)\n\n🚫 Avoid Composting These Items:\nMeat, fish, dairy products, oily foods, pet waste, and plastics — they cause odor and attract pests.\n\n🔁 3. Balance Green and Brown Materials\nGreens: Moist materials rich in nitrogen (food scraps, grass).\nBrowns: Dry materials rich in carbon (leaves, paper).\nKeep a good balance — about 3 parts brown to 1 part green.\n\n🌬️ 4. Turn and Aerate Regularly\nMix or turn your compost every 1–2 weeks to allow oxygen flow and speed up decomposition.\n\n💧 5. Maintain Moisture\nYour compost should feel like a damp sponge — not too dry or too wet. Add water if it\'s dry and browns if it\'s too wet.\n\n🌱 6. Harvest Your Compost\nAfter 2–3 months, the compost will turn dark, crumbly, and earthy-smelling. Use it for your garden, potted plants, or lawn.\n\n💚 7. Keep Learning and Improving\nComposting gets easier with practice. Track what works best and encourage others to try it too!',
    },
    {
      id: 4,
      title: 'Recycling Hacks',
      author: 'Kwame',
      image: '/recycling-hacks.jpg',
      content: '♻️ Recycling Hacks\n\nRecycling doesn\'t have to be boring! With a few clever hacks, you can reduce waste, reuse materials, and make recycling part of your everyday life.\n\n🔄 1. Know What\'s Recyclable\nCheck local recycling guidelines to know which items can be recycled. Common recyclables include plastics, paper, cardboard, glass, and metals.\n\n🧴 2. Rinse Before You Recycle\nAlways rinse bottles, cans, and containers to prevent contamination and odors. Dirty recyclables often end up in landfills.\n\n🧃 3. Flatten and Save Space\nFlatten cardboard boxes and plastic bottles before tossing them in the recycling bin — it saves space and makes collection more efficient.\n\n🪣 4. Reuse Before You Recycle\nGet creative — use jars for storage, turn bottles into planters, or craft old boxes into organizers. Reusing extends an item\'s life before it\'s recycled.\n\n📦 5. Separate Materials\nDon\'t mix different materials (like paper with plastic or metal with glass). Separation improves the quality of recycled materials.\n\n♻️ 6. Create a Recycling Station at Home\nLabel separate bins for plastics, paper, and general waste. Keeping them visible makes sorting easier for everyone in the household.\n\n🌍 7. Support Recycled Products\nBuy products made from recycled materials — paper, packaging, or clothing. Supporting these products closes the recycling loop.\n\n💡 8. Get the Community Involved\nEncourage friends, schools, or workplaces to recycle. Small local initiatives can lead to big environmental impact.'
    },
  ];

  const awarenessItems = [
    {
      id: 1,
      title: 'Disposing food waste',
      description: 'Learn the proper way to dispose of food waste',
      image: '/food-waste.jpg',
    },
    {
      id: 2,
      title: 'Disposing medical waste',
      description: 'Safe disposal methods for medical waste',
      image: '/medical-waste.jpg',
    },
    {
      id: 3,
      title: 'Community Outreach',
      description: 'Get involved in local waste management initiatives',
      image: '/community.jpg',
    },
    {
      id: 4,
      title: 'Waste Management Tips',
      description: 'Best practices for effective waste management',
      image: '/waste-tips.jpg',
    },
  ];

  const requestLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted', position);
          // Handle successful location access
        },
        (error) => {
          console.error('Error getting location', error);
          // Handle location access error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Function to render formatted content with line breaks and emojis
  const renderFormattedContent = (content: string) => {
    return content.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-4 text-gray-700">
        {paragraph.split('\n').map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] p-6 pb-24 relative">
      {/* Waste Sorting Tips Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl transform transition-all">
            {/* Modal Header */}
            <div className="relative">
              <div className="h-40 bg-green-50 flex items-center justify-center">
                <div className="text-5xl">
                  {selectedCard?.title === 'Environmental Tips' ? '🌍' : 
                   selectedCard?.title === 'Composting Guide' ? '🌿' : 
                   selectedCard?.title === 'Recycling Hacks' ? '♻️' : '♻️'}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCard?.title}</h2>
              <div className="prose max-w-none">
                {selectedCard?.content ? renderFormattedContent(selectedCard.content) : 'No content available.'}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#00A86B] text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-md mx-auto">
        {/* Give Away Properties Modal */}
        {isGiveawayModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-xl transform transition-all">
              {/* Modal Header */}
              <div className="relative">
                <div className="h-40 bg-green-50 flex items-center justify-center">
                  <div className="text-5xl">🏠</div>
                </div>
                <button
                  onClick={() => setIsGiveawayModalOpen(false)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Give Away Properties</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">List your unwanted properties and give them a second life by donating to those in need.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <p className="text-yellow-800 text-sm">ℹ️ This feature is coming soon. You'll be able to list properties you no longer need and connect with people who can use them.</p>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => setIsGiveawayModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-[#00A86B] text-white rounded-lg hover:bg-green-600 transition-colors"
                  disabled
                >
                  List Property (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Greeting Section */}
        <section className="mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 font-bricolage">Good Morning, {userName}</h1>
            <span className="ml-2 text-2xl">👋</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Improper waste management can lead to the proliferation of pests and disease.
          </p>
        </section>

        {/* Green Points Card - Redesigned */}
        <section className="bg-gradient-to-br from-[#00A86B] to-[#00805A] rounded-2xl p-5 mb-6 relative overflow-hidden shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-white/80 text-sm font-medium">Your Green Points</p>
                <h2 className="text-white text-2xl font-bold font-bricolage flex items-center">
                  1,250 <span className="ml-2">🪙</span>
                </h2>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white text-sm font-medium">Level 3</span>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4">
              Keep going! 250 more points to reach <span className="font-semibold text-white">Level 4</span>
            </p>
            
            {/* Progress with steps */}
            <div className="mb-4">
              <div className="flex justify-between text-white/80 text-xs mb-1">
                <span>Level 3</span>
                <span>1,250 / 1,500</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-white h-2.5 rounded-full" 
                  style={{ width: '83%' }}
                ></div>
              </div>
              <div className="flex justify-between text-white/60 text-[10px]">
                <span>0</span>
                <span>500</span>
                <span>1,000</span>
                <span>1,500</span>
                <span>2,000</span>
              </div>
            </div>
            
            <button 
              className="w-full bg-white text-[#00A86B] hover:bg-gray-100 transition-colors text-sm font-medium py-3 px-4 rounded-lg mt-6 flex items-center justify-center space-x-2"
            >
              <Gift className="h-5 w-5" />
              <span>Redeem Rewards</span>
            </button>
          </div>
          
          {/* Decorative leaf icon */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 opacity-20">
            <Leaf className="w-full h-full text-white" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <button className="text-sm text-[#00A86B] flex items-center">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between w-full overflow-x-auto pb-4 px-1">
            {quickActions.map((action) => (
              <Link 
                key={action.id}
                href={action.href || '#'}
                onClick={(e) => {
                  if (action.onClick) {
                    e.preventDefault();
                    action.onClick();
                  }
                }}
                className="flex flex-col items-center justify-center flex-1 min-w-[70px] max-w-[90px] mx-1.5"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 hover:bg-gray-50 transition-colors">
                  {action.icon}
                </div>
                <span className="text-xs text-center text-gray-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Earn Rewards Banner */}
        <section className="bg-[#00A86B] rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-white text-xl font-semibold">Earn Rewards</h2>
            <p className="text-white text-opacity-90 text-sm mt-1 mb-4">
              Sort waste & recycle your waste to earn rewards.
            </p>
            <button className="bg-white text-[#00A86B] text-sm font-medium py-2 px-4 rounded-lg">
              Get Started
            </button>
          </div>
          <div className="absolute right-4 bottom-0 w-24 h-24 bg-green-500 rounded-tl-full flex items-end justify-center">
            <div className="w-16 h-16 bg-green-400 rounded-full mb-2 flex items-center justify-center">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
        </section>


        {/* Learn Section */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learn</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account and discover helpful waste management tips.
            </p>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="relative mb-6">
            <div 
              className="flex space-x-4 overflow-x-auto pb-4 -mx-1.5 px-1.5 scrollbar-hide" 
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {learnCards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex-shrink-0 w-48 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    scrollSnapAlign: 'start',
                    minWidth: '11rem',
                    flex: '0 0 auto',
                  }}
                  onClick={() => {
                    if (['Waste Sorting Tips', 'Environmental Tips', 'Composting Guide', 'Recycling Hacks'].includes(card.title)) {
                      setSelectedCard(card);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <div className="bg-gray-100 h-24 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {card.title === 'Waste Sorting Tips' ? (
                      <img 
                        src="/sort.jpg" 
                        alt={card.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : card.title === 'Environmental Tips' ? (
                      <img 
                        src="/environment.jpg" 
                        alt={card.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : card.title === 'Composting Guide' ? (
                      <img 
                        src="/compost.jpg" 
                        alt={card.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : card.title === 'Recycling Hacks' ? (
                      <img 
                        src="/recycle.jpg" 
                        alt={card.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Image: {card.title}</span>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{card.title}</h3>
                  <div className="flex items-center mt-2">
                    <div 
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-medium mr-2 ${
                        card.author === 'Jabari' ? 'bg-blue-500' :
                        card.author === 'Ikechukwu Aruah' ? 'bg-green-500' :
                        card.author === 'Carole .E' ? 'bg-purple-500' :
                        card.author === 'Kwame' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}
                    >
                      {card.author.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-500 truncate">{card.author}</span>
                  </div>
                </div>
              ))}
              {/* Add some extra space at the end for better scrolling */}
              <div className="flex-shrink-0 w-4"></div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center space-x-1 mt-2">
              {learnCards.map((_, index) => (
                <div 
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Awareness List */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">Awareness</h3>
            <div className="space-y-3">
              {awarenessItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-400 text-xs text-center">Img</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
