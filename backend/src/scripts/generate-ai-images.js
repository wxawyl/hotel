const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const aiImageBaseUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image';

const productImages = {
  'Vietnamese Coffee': `${aiImageBaseUrl}?prompt=Vietnamese%20drip%20coffee%20with%20traditional%20phin%20filter%20on%20wooden%20table%20Vietnam%20style&image_size=square`,
  'Silk Scarf': `${aiImageBaseUrl}?prompt=elegant%20handmade%20silk%20scarf%20with%20traditional%20Vietnamese%20pattern%20colorful%20fabric&image_size=square`,
  'Incense Sticks': `${aiImageBaseUrl}?prompt=traditional%20Vietnamese%20incense%20sticks%20in%20beautiful%20ceramic%20holder%20smoke%20rising&image_size=square`,
  'Handmade Ceramics': `${aiImageBaseUrl}?prompt=handmade%20Vietnamese%20ceramic%20pottery%20beautiful%20traditional%20design%20clay%20art&image_size=square`,
  'Bamboo Toothbrush': `${aiImageBaseUrl}?prompt=eco%20friendly%20bamboo%20toothbrush%20natural%20wooden%20handle%20green%20sustainable&image_size=square`,
  'Cotton Towel Set': `${aiImageBaseUrl}?prompt=soft%20cotton%20towel%20set%20white%20bathroom%20towels%20folded%20neatly&image_size=square`,
  'Slippers': `${aiImageBaseUrl}?prompt=comfortable%20hotel%20slippers%20soft%20fabric%20white%20elegant%20design&image_size=square`,
  'Vietnamese Tea': `${aiImageBaseUrl}?prompt=Vietnamese%20green%20tea%20in%20traditional%20teacup%20tea%20leaves%20Asian%20style&image_size=square`,
  'Fish Sauce': `${aiImageBaseUrl}?prompt=traditional%20Vietnamese%20fish%20sauce%20nuoc%20mam%20in%20glass%20bottle%20condiment&image_size=square`,
  'Handwoven Basket': `${aiImageBaseUrl}?prompt=handwoven%20bamboo%20basket%20traditional%20Vietnamese%20craft%20natural%20material&image_size=square`,
};

db.serialize(() => {
  Object.entries(productImages).forEach(([name, imageUrl]) => {
    db.run(
      'UPDATE products SET image_url = ? WHERE name = ?',
      [imageUrl, name],
      function(err) {
        if (err) {
          console.error(`Error updating ${name}: ${err.message}`);
        } else if (this.changes > 0) {
          console.log(`Updated ${name}`);
        } else {
          console.log(`Product ${name} not found`);
        }
      }
    );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('All AI-generated images updated!');
});
