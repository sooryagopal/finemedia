import React, { useState, useMemo } from "react";
import { Zap, DollarSign, Users, CheckCircle2 } from "lucide-react";

const CostEstimator = () => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState(0);
  const [selectedServices, setSelectedServices] = useState({
    photography: false,
    tvSetup: false,
    videography: false,
  });

  // ==========================================
  // BASE COSTS & PRICING DATA
  // ==========================================
  const eventBaseCosts = {
    Wedding: 50000,
    Birthday: 20000,
    Corporate: 35000,
    Concert: 70000,
    "College Event": 25000,
  };

  const serviceCosts = {
    photography: 8000,
    tvSetup: 5000,
    videography: 10000,
  };

  const GUEST_COST_PER_HEAD = 300;

  // ==========================================
  // AI LOGIC: CALCULATE TOTAL COST
  // ==========================================
  const calculation = useMemo(() => {
    // Step 1: Get base event cost
    const baseEventCost = eventBaseCosts[eventType] || 0;

    // Step 2: Calculate selected services cost
    const selectedServicesCost = Object.keys(selectedServices).reduce(
      (total, service) => {
        return selectedServices[service] ? total + serviceCosts[service] : total;
      },
      0
    );

    // Step 3: Calculate guest cost
    const guestCost = guests * GUEST_COST_PER_HEAD;

    // Step 4: Calculate total
    const totalCost = baseEventCost + selectedServicesCost + guestCost;

    // Step 5: Classify event category based on total cost
    let eventCategory = "Not Selected";
    if (eventType) {
      if (totalCost > 100000) {
        eventCategory = "Premium Event";
      } else if (totalCost < 50000) {
        eventCategory = "Budget Event";
      } else {
        eventCategory = "Standard Event";
      }
    }

    // Step 6: Generate smart suggestion based on AI logic
    let suggestion = "";
    if (selectedServicesCost > baseEventCost * 0.5) {
      suggestion = "💡 Many services selected! Consider removing videography to save ₹10,000.";
    } else if (guests > 200 && totalCost > 100000) {
      suggestion = "💡 High guest count detected. Consider venue negotiation or reduce services.";
    } else if (totalCost < 30000 && eventType) {
      suggestion = "💡 Great budget planning! You can add photography for better memories.";
    } else if (totalCost > 150000) {
      suggestion = "💡 Premium event! Ensure all services are necessary for your needs.";
    } else {
      suggestion = "✅ Your event is well-planned!";
    }

    return {
      baseEventCost,
      selectedServicesCost,
      guestCost,
      totalCost,
      eventCategory,
      suggestion,
    };
  }, [eventType, guests, selectedServices]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  const handleServiceChange = (service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const handleReset = () => {
    setEventType("");
    setGuests(0);
    setSelectedServices({
      photography: false,
      tvSetup: false,
      videography: false,
    });
  };

  // ==========================================
  // HELPER FUNCTION: Format currency
  // ==========================================
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // ==========================================
  // HELPER FUNCTION: Get category color
  // ==========================================
  const getCategoryColor = (category) => {
    if (category === "Premium Event") return "text-purple-600 bg-purple-100";
    if (category === "Budget Event") return "text-green-600 bg-green-100";
    if (category === "Standard Event") return "text-blue-600 bg-blue-100";
    return "text-gray-600 bg-gray-100";
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-yellow-500" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">
              AI Cost Estimator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get instant cost estimation for your perfect event
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* ==================== LEFT SECTION: INPUT FORM ==================== */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Event Type Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  📅 Select Event Type
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Object.keys(eventBaseCosts).map((type) => (
                    <button
                      key={type}
                      onClick={() => setEventType(type)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                        eventType === type
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {eventType && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Base Cost: {formatCurrency(eventBaseCosts[eventType])}
                  </p>
                )}
              </div>

              {/* Guest Count */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  <Users className="inline mr-2" size={20} />
                  Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setGuests(Math.max(0, guests - 10))
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(0, parseInt(e.target.value) || 0))}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-blue-600"
                    min="0"
                  />
                  <button
                    onClick={() => setGuests(guests + 10)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    +10
                  </button>
                </div>
                {guests > 0 && (
                  <p className="text-sm text-blue-600 mt-2">
                    💰 Guest Cost: {formatCurrency(guests * GUEST_COST_PER_HEAD)} (@₹{GUEST_COST_PER_HEAD}/head)
                  </p>
                )}
              </div>

              {/* Optional Services */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  🎬 Optional Services
                </label>
                <div className="space-y-3">
                  {[
                    { key: "photography", label: "📷 Photography", cost: 8000 },
                    { key: "tvSetup", label: "📺 TV Setup", cost: 5000 },
                    { key: "videography", label: "🎥 Videography", cost: 10000 },
                  ].map(({ key, label, cost }) => (
                    <div
                      key={key}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border-2 border-gray-200"
                      onClick={() => handleServiceChange(key)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices[key]}
                        onChange={() => handleServiceChange(key)}
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                      />
                      <label className="flex-1 ml-4 cursor-pointer font-medium text-gray-700">
                        {label}
                      </label>
                      <span className="text-blue-600 font-bold">
                        +{formatCurrency(cost)}
                      </span>
                    </div>
                  ))}
                </div>
                {Object.values(selectedServices).some(Boolean) && (
                  <p className="text-sm text-green-600 mt-3">
                    ✓ Services Total: {formatCurrency(calculation.selectedServicesCost)}
                  </p>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                🔄 Reset All
              </button>
            </div>
          </div>

          {/* ==================== RIGHT SECTION: COST BREAKDOWN & RESULT ==================== */}
          <div className="md:col-span-1">
            {eventType ? (
              <div className="space-y-6">
                {/* Cost Breakdown Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign size={24} className="text-blue-600" />
                    Cost Breakdown
                  </h3>

                  <div className="space-y-3 mb-6 border-b pb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Base Event:</span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(calculation.baseEventCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Services:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(calculation.selectedServicesCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Guests ({guests}):</span>
                      <span className="font-semibold text-purple-600">
                        {formatCurrency(calculation.guestCost)}
                      </span>
                    </div>
                  </div>

                  {/* Total Cost (Big Display) */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-4 text-center">
                    <p className="text-sm opacity-90 mb-2">Estimated Total Cost</p>
                    <h2 className="text-4xl font-bold">
                      {formatCurrency(calculation.totalCost)}
                    </h2>
                  </div>

                  {/* Event Category Badge */}
                  <div className="text-center mb-4">
                    <span
                      className={`px-6 py-2 rounded-full font-bold text-sm ${getCategoryColor(
                        calculation.eventCategory
                      )}`}
                    >
                      {calculation.eventCategory}
                    </span>
                  </div>

                  {/* Divider */}
                  <hr className="my-4" />

                  {/* Smart Suggestion */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-gray-800">{calculation.suggestion}</p>
                  </div>
                </div>

                {/* AI Logic Explanation Card */}
                <div className="bg-indigo-50 rounded-2xl shadow p-6 border-2 border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    How AI Works?
                  </h4>
                  <ul className="text-sm text-indigo-800 space-y-2">
                    <li>✓ Calculates base event cost instantly</li>
                    <li>✓ Adds selected services dynamically</li>
                    <li>✓ Multiplies guests × ₹300/head</li>
                    <li>✓ Classifies event category by total</li>
                    <li>✓ Generates smart suggestions</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full flex items-center justify-center">
                <div>
                  <Zap size={48} className="mx-auto text-yellow-400 mb-4" />
                  <p className="text-gray-600 font-semibold">
                    Select an event type to begin estimation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
