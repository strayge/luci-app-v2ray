/**
 * @license
 * Copyright 2020 Xingwang Liao <kuoruan@gmail.com>
 *
 * Licensed to the public under the MIT License.
 */
"use strict";

"require form";

"require uci";

"require v2ray";

// "require view";
// @ts-ignore
return L.view.extend({
    load: function() {
        return v2ray.getSections("policy_level", "level");
    },
    render: function(e) {
        void 0 === e && (e = []);
        var o, n = new form.Map("v2ray", "%s - %s".format(_("V2Ray"), _("Policy")), _("Details: %s").format('<a href="https://www.v2fly.org/config/policy.html#policyobject" target="_blank">PolicyObject</a>')), l = n.section(form.NamedSection, "main_policy", "policy");
        l.anonymous = !0, l.addremove = !1, (o = l.option(form.Flag, "enabled", _("Enabled"))).rmempty = !1, 
        o = l.option(form.MultiValue, "levels", _("Levels"), _("Select policy levels"));
        for (var t = 0, a = e; t < a.length; t++) {
            var i = a[t];
            o.value(i.value, i.caption);
        }
        o = l.option(form.Flag, "system_stats_inbound_uplink", "%s - %s".format(_("System"), _("Stats inbound uplink"))), 
        o = l.option(form.Flag, "system_stats_inbound_downlink", "%s - %s".format(_("System"), _("Stats inbound downlink")));
        var r = n.section(form.GridSection, "policy_level", _("Policy Level"), _("Add policy levels here"));
        return r.anonymous = !0, r.addremove = !0, r.sortable = !0, r.nodescription = !0, 
        (o = r.option(form.Value, "level", _("Level"))).rmempty = !1, o.datatype = "uinteger", 
        (o = r.option(form.Value, "handshake", _("Handshake"))).datatype = "uinteger", o.placeholder = "4", 
        (o = r.option(form.Value, "conn_idle", _("Connection idle"))).datatype = "uinteger", 
        o.placeholder = "300", (o = r.option(form.Value, "uplink_only", _("Uplink only"))).modalonly = !0, 
        o.datatype = "uinteger", o.placeholder = "2", (o = r.option(form.Value, "downlink_only", _("Downlink only"))).modalonly = !0, 
        o.datatype = "uinteger", o.placeholder = "5", (o = r.option(form.Flag, "stats_user_uplink", _("Stats user uplink"))).modalonly = !0, 
        (o = r.option(form.Flag, "stats_user_downlink", _("Stats user downlink"))).modalonly = !0, 
        (o = r.option(form.Value, "buffer_size", _("Buffer size"))).datatype = "uinteger", 
        n.render();
    }
});