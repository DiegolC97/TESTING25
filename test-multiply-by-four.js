// Simple test to verify multiplyByFour logic
class Counter {
  static MIN = -1000;
  static MAX = 1000;

  constructor(count) {
    this._count = count;
  }

  static create() {
    return new Counter(0);
  }

  get count() {
    return this._count;
  }

  multiplyByFour() {
    const result = this._count * 4;
    if (result > Counter.MAX) {
      this._count = Counter.MAX;
    } else if (result < Counter.MIN) {
      this._count = Counter.MIN;
    } else {
      this._count = result;
    }
  }
}

// Test 1: Result is clamped to 1000 if it exceeds the max limit
console.log('\n=== Test 1: Clamping to MAX ===');
const counter1 = new Counter(300);
console.log(`Initial count: ${counter1.count}`);
counter1.multiplyByFour();
console.log(`After multiplyByFour: ${counter1.count}`);
console.log(`Expected: 1000 (clamped), Actual: ${counter1.count}`);
console.log(`✓ PASS: ${counter1.count === 1000}`);

// Test 2: Result is clamped to -1000 if it goes below the min limit
console.log('\n=== Test 2: Clamping to MIN ===');
const counter2 = new Counter(-300);
console.log(`Initial count: ${counter2.count}`);
counter2.multiplyByFour();
console.log(`After multiplyByFour: ${counter2.count}`);
console.log(`Expected: -1000 (clamped), Actual: ${counter2.count}`);
console.log(`✓ PASS: ${counter2.count === -1000}`);

// Test 3: Normal multiplication within limits
console.log('\n=== Test 3: Normal multiplication ===');
const counter3 = new Counter(5);
console.log(`Initial count: ${counter3.count}`);
counter3.multiplyByFour();
console.log(`After multiplyByFour: ${counter3.count}`);
console.log(`Expected: 20, Actual: ${counter3.count}`);
console.log(`✓ PASS: ${counter3.count === 20}`);

// Test 4: Multiplying 0 results in 0 (button will be disabled for this)
console.log('\n=== Test 4: Multiplying 0 ===');
const counter4 = Counter.create();
console.log(`Initial count: ${counter4.count}`);
counter4.multiplyByFour();
console.log(`After multiplyByFour: ${counter4.count}`);
console.log(`Expected: 0, Actual: ${counter4.count}`);
console.log(`✓ PASS: ${counter4.count === 0}`);

// Test 5: Edge case - exactly at limit
console.log('\n=== Test 5: Exactly at limit ===');
const counter5 = new Counter(250);
console.log(`Initial count: ${counter5.count}`);
counter5.multiplyByFour();
console.log(`After multiplyByFour: ${counter5.count}`);
console.log(`Expected: 1000, Actual: ${counter5.count}`);
console.log(`✓ PASS: ${counter5.count === 1000}`);

// Test 6: Negative number within limits
console.log('\n=== Test 6: Negative within limits ===');
const counter6 = new Counter(-50);
console.log(`Initial count: ${counter6.count}`);
counter6.multiplyByFour();
console.log(`After multiplyByFour: ${counter6.count}`);
console.log(`Expected: -200, Actual: ${counter6.count}`);
console.log(`✓ PASS: ${counter6.count === -200}`);

console.log('\n=== All Tests Completed ===\n');
