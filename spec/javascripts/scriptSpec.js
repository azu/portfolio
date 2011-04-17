//noinspection ThisExpressionReferencesGlobalObjectJS
(function() {
  $(function() {
    jasmine.getFixtures().fixturesPath = '/';
    return describe("Script.jsは", function() {
      it("portというグローバル空間を持つ", function() {
        return expect(port).toBeDefined();
      });
      describe("DOMからサイト情報をとる", function() {
        describe("port.getSiteInfoが取得成功した場合", function() {
          beforeEach(function() {
            jasmine.getFixtures().load('sites.html');
            return this.sites = port.getSiteInfo('#contents > article');
          });
          it("articleを取得ができる", function() {
            return expect($.isEmptyObject(this.sites)).toBeFalsy();
          });
          it("タイトルが定義されている", function() {
            return $.each(this.sites, function(key, value) {
              return expect(value.title).toBeDefined();
            });
          });
          it("URLが定義されている", function() {
            return $.each(this.sites, function(key, value) {
              return expect(value.url).toBeDefined();
            });
          });
          return it("サムネイルが定義されている", function() {
            return $.each(this.sites, function(key, value) {
              return expect(value.screenshot).toBeDefined();
            });
          });
        });
        return describe("port.getSiteInfoが取得失敗した場合", function() {
          return it("falseを返す", function() {
            sandbox();
            this.sites = port.getSiteInfo('#contents > article');
            return expect(this.sites).toBeFalsy();
          });
        });
      });
      return describe("Nav要素", function() {
        var data;
        data = {
          "com-example": {
            title: "タイトル",
            url: "http://example.com",
            screenshot: "http://pivotal.github.com/jasmine/images/jasmine_logo.png",
            description: "説明文"
          }
        };
        beforeEach(function() {
          return this.nav = port.createNav(data);
        });
        it("createNavはdataを元にNav要素を作成できる", function() {
          return expect($(this.nav)).toExist();
        });
        return it("insertNavはNav要素を挿入できる", function() {
          var ref;
          jasmine.getFixtures().load('sites.html');
          ref = $('#contents');
          ref.prepend(this.nav);
          return expect($('.nav-roll')).toExist();
        });
      });
    });
  });
}).call(this);
