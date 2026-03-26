# 💻 Cost Estimator - Code Examples & Usage

## 📌 Quick Start

### Access the Component via URL:
```
http://localhost:5173/cost-estimator
```

### Access from Navbar:
Click **💰 Cost Estimator** in the navigation menu

---

## 🧮 Example Calculations

### Example 1: Budget-Friendly Birthday Party
```
Event Type: Birthday (₹20,000)
Services: None
Guests: 30

Calculation:
├─ Base Cost: ₹20,000
├─ Services: ₹0
├─ Guest Cost: 30 × ₹300 = ₹9,000
└─ TOTAL: ₹29,000

Result: Budget Event 🟢
Suggestion: "Add photography for better memories"
```

### Example 2: Standard Corporate Event
```
Event Type: Corporate (₹35,000)
Services: TV Setup (₹5,000)
Guests: 80

Calculation:
├─ Base Cost: ₹35,000
├─ Services: ₹5,000
├─ Guest Cost: 80 × ₹300 = ₹24,000
└─ TOTAL: ₹64,000

Result: Standard Event 🔵
Suggestion: "Your event is well-planned!"
```

### Example 3: Premium Wedding
```
Event Type: Wedding (₹50,000)
Services: Photography (₹8,000) + TV Setup (₹5,000) + Videography (₹10,000)
Guests: 200

Calculation:
├─ Base Cost: ₹50,000
├─ Services: ₹23,000
├─ Guest Cost: 200 × ₹300 = ₹60,000
└─ TOTAL: ₹133,000

Result: Premium Event 🟣
Suggestion: "Ensure all services are necessary for your needs"
```

### Example 4: Concert with Minimal Services
```
Event Type: Concert (₹70,000)
Services: Photography (₹8,000) only
Guests: 150

Calculation:
├─ Base Cost: ₹70,000
├─ Services: ₹8,000
├─ Guest Cost: 150 × ₹300 = ₹45,000
└─ TOTAL: ₹123,000

Result: Premium Event 🟣
Suggestion: "High guest count detected. Consider venue negotiation or reduce services"
```

---

## 🎨 UI/UX Elements

### Button States:
```javascript
// Selected Event Type
className="bg-blue-600 text-white shadow-lg"

// Unselected Event Type
className="bg-gray-200 text-gray-700 hover:bg-gray-300"

// Guest Count Adjust Buttons
<button className="bg-red-500 text-white">-10</button>
<button className="bg-green-500 text-white">+10</button>
```

### Color Scheme:
```javascript
// Premium Event (Red/Purple)
eventCategory = "Premium Event"
className = "text-purple-600 bg-purple-100"

// Standard Event (Blue)
eventCategory = "Standard Event"
className = "text-blue-600 bg-blue-100"

// Budget Event (Green)
eventCategory = "Budget Event"
className = "text-green-600 bg-green-100"
```

---

## 🔌 Component Props (If Reused)

The CostEstimator component doesn't require any props as it's self-contained.

### However, if you want to extend it:

```javascript
// Add props to CostEstimator component:
const CostEstimator = ({ 
  baseCosts = eventBaseCosts,  // Override default costs
  services = serviceCosts,      // Override services
  perHeadCost = 300,           // Override guest cost
  onEstimate = null            // Callback function
}) => {
  // Implementation...
}

// Usage:
<CostEstimator 
  perHeadCost={400}
  onEstimate={(data) => console.log(data)}
/>
```

---

## 🧠 AI Logic Breakdown

### Decision Tree:
```
START
│
├─ User selects Event Type?
│  ├─ NO → Show prompt
│  └─ YES → Retrieve base cost ✓
│
├─ User enters Guest Count?
│  └─ YES → Calculate (guests × ₹300) ✓
│
├─ User selects Services?
│  └─ YES → Sum service costs ✓
│
├─ Calculate Total = Base + Services + Guests
│
├─ Classify Event Category:
│  ├─ IF Total > ₹100,000 → Premium
│  ├─ IF Total < ₹50,000 → Budget
│  └─ ELSE → Standard
│
└─ Generate Smart Suggestion
   ├─ IF Services > 50% Base → "Reduce services"
   ├─ IF Guests > 200 AND Total > ₹100K → "Negotiate venue"
   ├─ IF Total < ₹30K → "Add photography"
   ├─ IF Total > ₹150K → "Check necessity"
   └─ ELSE → "Well-planned!"

END
```

---

## 💾 State Management

```javascript
// Event Type State
const [eventType, setEventType] = useState("");
// Values: "", "Wedding", "Birthday", "Corporate", "Concert", "College Event"

// Guest Count State
const [guests, setGuests] = useState(0);
// Values: 0, 10, 20, ..., any positive number

// Services Selected State
const [selectedServices, setSelectedServices] = useState({
  photography: false,
  tvSetup: false,
  videography: false,
});
// Each can be true or false
```

---

## 🎯 User Interactions

### 1. Select Event Type:
```javascript
onClick={() => setEventType("Wedding")}
// Updates UI and triggers recalculation via useMemo
```

### 2. Adjust Guest Count:
```javascript
onClick={() => setGuests(guests + 10)}  // Increment
onClick={() => setGuests(Math.max(0, guests - 10))}  // Decrement
onChange={(e) => setGuests(parseInt(e.target.value) || 0)}  // Direct input
```

### 3. Toggle Service:
```javascript
onClick={() => handleServiceChange("photography")}
// Toggles photography from false to true or vice versa
// Triggers recalculation
```

### 4. Reset All:
```javascript
onClick={handleReset}
// Clears eventType, guests, and all selected services
```

---

## 📊 Real-Time Calculation Flow

```
User Action (select event, add guest, check service)
           ↓
React detects dependency change
           ↓
useMemo recalculates values instantly
           ↓
calculation state updates:
├─ baseEventCost
├─ selectedServicesCost
├─ guestCost
├─ totalCost
├─ eventCategory
└─ suggestion
           ↓
Component re-renders with new values
           ↓
User sees updated Estimated Cost & Category
```

---

## 🔄 Performance Optimization

### Why useMemo?
```javascript
const calculation = useMemo(() => {
  // Only recalculates when these change:
}, [eventType, guests, selectedServices]);
// NOT recalculated when: UI updates, unnecessary re-renders, etc.
```

**Benefits:**
- Prevents unnecessary computations
- Improves performance for large calculations
- Ensures instant UI updates
- Reduces CPU usage

---

## 🎨 Tailwind CSS Classes Used

```javascript
// Gradients
"bg-gradient-to-br from-blue-50 to-indigo-100"
"bg-gradient-to-r from-blue-600 to-indigo-600"

// Spacing
"py-12 px-4"  // Padding
"gap-8"       // Gap between grid items
"mb-4"        // Margin bottom

// Colors
"text-blue-600"
"bg-purple-100"
"text-gray-700"

// Effects
"shadow-lg"
"rounded-2xl"
"hover:scale-105 transform"
"transition-all"
```

---

## 📱 Responsive Breakpoints

```javascript
// Desktop (md and above)
<div className="md:col-span-2">  // Takes 2/3 of width
<div className="md:col-span-1">  // Takes 1/3 of width

// Mobile (below md)
Single column layout - stacks vertically

// Sticky positioning on desktop
position: sticky;
top: 4; // Stays 1rem from top while scrolling
```

---

## ✨ Future Enhancement Ideas

### 1. Add Coupon System:
```javascript
const [couponCode, setCouponCode] = useState("");
const discountPercentage = applyCoupon(couponCode);
const discountedTotal = totalCost * (1 - discountPercentage/100);
```

### 2. Save Estimates:
```javascript
const saveEstimate = async () => {
  const response = await fetch("/api/estimates", {
    method: "POST",
    body: JSON.stringify({ eventType, guests, selectedServices, totalCost })
  });
}
```

### 3. Compare Multiple Estimates:
```javascript
const [estimates, setEstimates] = useState([]);
const addToComparison = () => {
  setEstimates([...estimates, calculation]);
}
```

### 4. Email Quote:
```javascript
const emailQuote = async (email) => {
  await fetch("/api/mail/send-quote", {
    method: "POST",
    body: JSON.stringify({ 
      email, 
      estimationData: calculation 
    })
  });
}
```

---

## 🧪 Testing Scenarios

### Test Case 1: Minimum Cost
```
Event: Birthday
Guests: 0
Services: None
Expected: ₹20,000 → Budget Event
```

### Test Case 2: Maximum Cost
```
Event: Concert
Guests: 1000
Services: All (Photography + TV + Videography)
Expected: ₹163,000 → Premium Event
```

### Test Case 3: Edge Case
```
Event: (None selected)
Result: Cost card should show prompt to select event
```

### Test Case 4: Suggestion Logic
```
Event: Birthday (₹20,000)
Guests: 100
Services: All (₹23,000)
Total: ₹53,000
Suggestion: Should detect "Services > Base" and suggest reduction
```

---

## 🚀 Deployment Notes

1. **Component is production-ready** ✓
2. **No backend API calls required** ✓
3. **No sensitive data stored** ✓
4. **Fully client-side calculation** ✓
5. **Uses only Tailwind CSS** ✓

---

## 📞 Support

For any issues or questions:
1. Check COST_ESTIMATOR_INTEGRATION_GUIDE.md
2. Review AI_COST_ESTIMATOR_EXPLANATION.md
3. Check console for error messages
4. Verify all dependencies are installed

---

## ✅ Checklist for Production

- [ ] Component loads without errors
- [ ] All calculations are accurate
- [ ] UI is responsive on all devices
- [ ] Icons display correctly
- [ ] No console warnings
- [ ] Navigation link works
- [ ] State management is clean
- [ ] Performance is optimized

You're all set! Happy coding! 🚀
