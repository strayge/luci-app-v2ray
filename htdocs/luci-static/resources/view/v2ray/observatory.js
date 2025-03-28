/**
 * @license
 * Copyright 2021 BI7PRK
 *
 * Licensed to the public under the MIT License.
 */
"use strict";

"require form";

// @ts-ignore
return L.view.extend({
    render: function() {
        var e = new form.Map("v2ray", "%s - %s".format(_("V2Ray"), _("Observatory")), _("Details: %s").format('<a href="https://www.v2fly.org/config/observatory.html#observatoryobject" target="_blank">ObservatoryObject</a>')), r = e.section(form.NamedSection, "main_observatory", "observatory");
        return r.addremove = !1, r.option(form.Flag, "enabled", _("Enabled")).rmempty = !1, 
        r.option(form.Value, "probeURL", _("ProbeURL"), _("A valid URL, it will be get request to testing. eg: <code>%s</code>.").format("https://api.github.com/_private/browser/stats")).placeholder = _("empty use the built-in value"), 
        r.option(form.Value, "probeInterval", _("ProbeInterval")), r.option(form.DynamicList, "subjectSelector", _("SubjectSelector")), 
        e.render();
    }
});