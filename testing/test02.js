// Test for response functionality
pm.test("Response contains an array of user objects", function () {
    pm.expect(pm.response.json()).to.be.an('array').that.is.not.empty;
    pm.expect(pm.response.json()[0]).to.have.property('address').that.is.an('object');
    pm.expect(pm.response.json()[0]).to.have.property('_id');
    pm.expect(pm.response.json()[0]).to.have.property('name');
    pm.expect(pm.response.json()[0]).to.have.property('email');
    pm.expect(pm.response.json()[0]).to.have.property('role');
    pm.expect(pm.response.json()[0]).to.have.property('createdAt');
});

// Test for scalability
pm.test("Response time is less than 800ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(800);
});

// Test for benchmark performance
pm.test("Throughput is at least 10 requests per second", function () {
    pm.expect(pm.response).to.have.property('stats');
    pm.expect(pm.response.stats).to.have.property('requests');
    pm.expect(pm.response.stats.requests).to.be.above(10);
});
