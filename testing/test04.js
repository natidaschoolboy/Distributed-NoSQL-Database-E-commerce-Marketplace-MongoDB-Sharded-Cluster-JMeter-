// Add functionality testing
pm.test("Response status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response is an array of reviews", function () {
  pm.expect(pm.response.json()).to.be.an('array').that.is.not.empty;
});

pm.test("Each review contains reviewer, product, rating, and comment properties", function () {
  pm.response.json().forEach(function(review) {
    pm.expect(review).to.have.property('reviewer');
    pm.expect(review).to.have.property('product');
    pm.expect(review).to.have.property('rating');
    pm.expect(review).to.have.property('comment');
  });
});

// Add scalability tests
pm.test("Response time is less than 500ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// Add benchmark performance tests
pm.test("Throughput is within acceptable range", function () {
  // Add throughput test logic here
});

pm.test("Latency is within acceptable range", function () {
  // Add latency test logic here
});
