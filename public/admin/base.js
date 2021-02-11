$(function(){
    app.init();

    layui.use('element', function(){
        var element = layui.element;
        
      });
})

let app = {
    init(){
        this.resize()
    },
    resize(){
        let height = $(window).height();
        let bodyHeight = height - 90 - 40;
        $("#contentBody").height(bodyHeight)
    }
}

window.onresize = function(){
    app.resize()
}