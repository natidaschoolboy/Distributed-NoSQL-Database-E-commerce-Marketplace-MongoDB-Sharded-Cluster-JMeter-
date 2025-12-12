// Test to check if the response is an array of orders
pm.test("Response is an array of orders", function () {
    pm.expect(pm.response.json()).to.be.an('array').that.is.not.empty;
});

// Test to check the structure of each order object
pm.test("Each order object has required properties", function () {
    pm.response.json().forEach(function(order) {
        pm.expect(order).to.have.property('_id');
        pm.expect(order).to.have.property('buyer');
        pm.expect(order).to.have.property('items');
        pm.expect(order).to.have.property('totalAmount');
        pm.expect(order).to.have.property('paymentStatus');
        pm.expect(order).to.have.property('deliveryAddress');
        pm.expect(order).to.have.property('orderDate');
    });
});

// Test for response time
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Scalability and performance testing can be done using external load testing tools like JMeter or k6
// Benchmarking performance tests for latency, throughput, etc. are not feasible with Postman tests
