<template>
    <div class="pt-40">
      <!-- Your component content here -->
    </div>
  </template>
  
  <script>
  import xmlbuilder from 'xmlbuilder';
  
  export default {
    created() {
      const xml = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' })
        .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        .ele('url')
        .ele('loc').txt('https://www.luliflex.com/').up()
        .ele('lastmod').txt(new Date().toISOString()).up()
        .end({ pretty: true });
  
      this.sitemapXML = new window.XMLSerializer().serializeToString(xml);
    },
    
    data() {
      return {
        sitemapXML: null,
      };
    },
  };
  </script>
  