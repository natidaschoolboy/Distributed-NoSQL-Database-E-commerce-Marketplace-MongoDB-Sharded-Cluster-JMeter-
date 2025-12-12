// Test for functionality
pm.test("Each product has a valid ID, name, and price", function () {
    pm.response.json().forEach(function(product) {
        pm.expect(product._id).to.be.a('string').and.to.have.lengthOf(24);
        pm.expect(product.name).to.be.a('string').and.to.not.be.empty;
        pm.expect(product.price).to.be.a('number').and.to.be.at.least(0);
    });
});

// Test for scalability
pm.test("Response contains less than 1000 products", function () {
    pm.expect(pm.response.json().length).to.be.below(1000);
});

// Performance benchmarking
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
