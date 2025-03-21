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
        return Promise.all([ v2ray.getSections("routing_rule"), v2ray.getSections("routing_balancer", "tag"), v2ray.getSections("outbound", "tag") ]);
    },
    render: function(o) {
        var a, t = void 0 === o ? [] : o, e = t[0], n = void 0 === e ? [] : e, r = t[1], i = void 0 === r ? [] : r, l = t[2], u = void 0 === l ? [] : l, m = new form.Map("v2ray", "%s - %s".format(_("V2Ray"), _("Routing")), _("Details: %s").format('<a href="https://www.v2fly.org/config/routing.html#routingobject" target="_blank">RoutingObject</a>')), s = m.section(form.NamedSection, "main_routing", "routing");
        s.anonymous = !0, s.addremove = !1, a = s.option(form.Flag, "enabled", _("Enabled")), 
        (a = s.option(form.ListValue, "domain_strategy", _("Domain resolution strategy"))).value(""), 
        a.value("AsIs"), a.value("IPIfNonMatch"), a.value("IPOnDemand"), (a = s.option(form.ListValue, "domain_matcher", _("Domain name matching algorithm"))).value("linear"), 
        a.value("mph"), a = s.option(form.MultiValue, "rules", _("Rules"), _("Select routing rules to use"));
        for (var c = 0, d = n; c < d.length; c++) {
            var g = d[c];
            a.value(g.value, g.caption);
        }
        a = s.option(form.MultiValue, "balancers", _("Balancers"), _("Select routing balancers to use"));
        a.value("none", _("None"))
        for (var p = 0, v = i; p < v.length; p++) {
            g = v[p];
            a.value(g.value, g.caption);
        }
        var f = m.section(form.GridSection, "routing_rule", _("Routing Rule"), _("Add routing rules here"));
        f.anonymous = !0, f.addremove = !0, f.sortable = !0, f.nodescription = !0, (a = f.option(form.Value, "alias", _("Alias"))).rmempty = !1, 
        (a = f.option(form.ListValue, "type", _("Type"))).value("field"), (a = f.option(form.DynamicList, "domain", _("Domain"))).modalonly = !0, 
        (a = f.option(form.DynamicList, "ip", _("IP"))).modalonly = !0, (a = f.option(form.DynamicList, "port", _("Port"))).modalonly = !0, 
        a.datatype = "or(port, portrange)", (a = f.option(form.MultiValue, "network", _("Network"))).value("tcp"), 
        a.value("udp"), (a = f.option(form.DynamicList, "source", _("Source"))).modalonly = !0, 
        (a = f.option(form.DynamicList, "user", _("User"))).modalonly = !0, a = f.option(form.DynamicList, "inbound_tag", _("Inbound tag")), 
        (a = f.option(form.MultiValue, "protocol", _("Protocol"))).modalonly = !0, a.value("http"), 
        a.value("tls"), a.value("bittorrent"), (a = f.option(form.Value, "attrs", _("Attrs"))).modalonly = !0, 
        (a = f.option(form.ListValue, "outbound_tag", _("Outbound tag"))).value("");
        for (var y = 0, b = u; y < b.length; y++) {
            g = b[y];
            a.value(g.caption);
        }
        (a = f.option(form.ListValue, "balancer_tag", _("Balancer tag"))).depends("outbound_tag", ""), 
        a.value("");
        for (var h = 0, L = i; h < L.length; h++) {
            g = L[h];
            a.value(g.caption);
        }
        (a = f.option(form.ListValue, "domain_matcher_r", _("Domain name matching algorithm"))).value(""), 
        a.value("linear"), a.value("mph");
        var V = m.section(form.TypedSection, "routing_balancer", _("Routing Balancer"), _("Add routing balancers here"));
        return V.anonymous = !0, V.addremove = !0, (a = V.option(form.Value, "tag", _("Tag"))).rmempty = !1, 
        (a = V.option(form.ListValue, "strategy_type", _("Balancer strategy"))).value("random"), 
        a.value("leastPing"), a.modalonly = !0, a = V.option(form.DynamicList, "selector", _("Selector")), 
        m.render();
    }
});