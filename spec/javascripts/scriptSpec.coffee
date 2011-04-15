$ ->
    jasmine.getFixtures().fixturesPath = '/' # 読み込みディレクトリはroot
    describe "Script.jsは",->
        it "portというグローバル空間を持つ", ->
            expect(port).toBeDefined()
        describe "DOMからサイト情報をとる", ->
            describe "port.getSiteInfoが取得成功した場合", ->
                beforeEach ->
                    jasmine.getFixtures().load('sites.html') # 対象ページ
                    @sites = port.getSiteInfo('#contents > article')
                it "articleを取得ができる", ->
                    expect($.isEmptyObject(@sites)).toBeFalsy()
                it "タイトルが定義されている" ,->
                    $.each @sites, (key, value) ->
                        expect(value.title).toBeDefined()
                it "URLが定義されている" , ->
                    $.each @sites, (key, value) ->
                        expect(value.url).toBeDefined()
                it "サムネイルが定義されている" , ->
                    $.each @sites, (key, value) ->
                        expect(value.screenshot).toBeDefined()
            describe "port.getSiteInfoが取得失敗した場合", ->
                #spyOn(window.console, "log") if window.console?.log
                it "falseを返す", ->
                   sandbox(); # sanboxに変える
                   @sites = port.getSiteInfo('#contents > article') # 情報取得
                   expect(@sites).toBeFalsy()
        describe "Nav要素", ->
            data =
                "com-example" :
                    title : "タイトル"
                    url   : "http://example.com"
                    screenshot : "http://pivotal.github.com/jasmine/images/jasmine_logo.png"
                    description : "説明文"
            beforeEach ->
                @nav = port.createNav(data)
            it "createNavはdataを元にNav要素を作成できる" ,->
                expect($(@nav)).toExist()
            it "insertNavはNav要素を挿入できる", ->
                jasmine.getFixtures().load('sites.html') # 対象ページ
                ref = $('#contents')
                ref.prepend(@nav)
                expect($('.nav-roll')).toExist()