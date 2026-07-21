const fs = require('fs');

const shopPath = '/Users/apple/Documents/GitHub/khfoods-storefront/src/lib/data/pages/shopPage.json';
let shopData = JSON.parse(fs.readFileSync(shopPath, 'utf8'));

// Domestic products mapping
const domesticSlugs = [
  "/product/roasted-peanuts-8-packs",
  "/product/roasted-peanuts-14-packs",
  "/product/roasted-peanuts-21-packs",
  "/product/roasted-peanuts-6-bags"
];

// International products mapping
const intlSlugs = [
  "/product/roasted-peanuts-6-bags-taiwan",
  "/product/roasted-peanuts-12-bags-taiwan",
  "/product/roasted-peanuts-14-packs-taiwan",
  "/product/roasted-peanuts-24-packs-taiwan"
];

if (shopData.sections && shopData.sections[1] && shopData.sections[1].content) {
  shopData.sections[1].content.forEach((item, index) => {
    item.props.slug.en = domesticSlugs[index];
    item.props.slug.hi = domesticSlugs[index];
  });
}

if (shopData.sections && shopData.sections[2] && shopData.sections[2].content) {
  shopData.sections[2].content.forEach((item, index) => {
    item.props.slug.en = intlSlugs[index];
    item.props.slug.hi = intlSlugs[index];
  });
}

fs.writeFileSync(shopPath, JSON.stringify(shopData, null, 2));
console.log('shopPage.json updated');
