function StoryApp() {

    var modules = {
        projectNewLoad : {},
        projectNew : {},
        projectLoad: {},
        projectManage: {},
        characterList: {}
    }
    this.modules = modules;

    this.moduleStack = [modules.projectNewLoad];
    this.activeModule = modules.projectNewLoad;

    this.checkBackButton = function() {
        var backButton = document.getElementById("backButton");
        if (this.moduleStack.length > 1) {
            backButton.classList.remove("hide");
        } else {
            backButton.classList.add("hide");
        }
    }

    this.registerModule = function(object, module, showMethod = null, hideMethod = null) {
        module.name = object.id;
        module.object = object;
        module.showMethod = showMethod;
        module.hideMethod = hideMethod;
    }

    this.pushModule = function(module, data = null) {
        this.activeModule.object.classList.add("hide");

        module.object.classList.remove("hide");
        this.moduleStack.push(module);
        this.activeModule = module;

        module.showMethod?.(data);     
        
        this.checkBackButton();
    }

    this.popModule = function() {
        var module = this.moduleStack.pop();
        module.object.classList.add("hide");
        module.hideMethod?.();
        
        var topModule = this.moduleStack[this.moduleStack.length - 1];
        topModule.object.classList.remove("hide");
        this.activeModule = topModule;

        this.checkBackButton();
    }
}