/**
 * @license
 * Copyright 2020 Xingwang Liao <kuoruan@gmail.com>
 *
 * Licensed to the public under the MIT License.
 */
"use strict";

"require form";

"require network";

"require uci";

"require v2ray";

// "require view";
// @ts-ignore
return L.view.extend({
    load: function() {
        return v2ray.getLocalIPs();
    },
    render: function(localIPs) {
        const m = new form.Map("v2ray", "%s - %s".format(_("V2Ray"), _("Inbound")));

        if (localIPs === 0) {
            localIPs = [];
        }
        var o = localIPs;
        var e, t = m.section(form.GridSection, "inbound");
        t.anonymous = !0, t.addremove = !0, t.sortable = !0;
        t.modaltitle = function(section_id) {
            var e = uci.get("v2ray", section_id, "alias");
            return _("Inbound") + " » " + (null != e ? e : _("Add"));
        };
        t.nodescriptions = true;
        
        t.tab("general", _("General Settings"));
        t.tab("stream", _("Stream Settings"));
        t.tab("other", _("Other Settings"));

        (
        /** General settings */
        e = t.taboption("general", form.Value, "alias", _("Alias"))).rmempty = !1, (e = t.taboption("general", form.Value, "listen", _("Listen"))).datatype = "ipaddr";
        for (var a = 0, r = o; a < r.length; a++) {
            var l = r[a];
            e.value(l);
        }
        (e = t.taboption("general", form.Value, "port", _("Port"))).rmempty = !1, e.datatype = "or(port, portrange)", 
        (e = t.taboption("general", form.ListValue, "protocol", _("Protocol"))).value("dokodemo-door", "Dokodemo-door"), 
        e.value("http", "HTTP"), e.value("mtproto", "MTProto"), e.value("shadowsocks", "Shadowsocks"), 
        e.value("socks", "Socks"), e.value("vmess", "VMess"), (
        // o.value("trojan", "Trojan");// Add Trojan Protocol support
        // o.value("vless", "VLESS"); // Add VLESS Protocol support
        // Settings - Dokodemo-door
        e = t.taboption("general", form.Value, "s_dokodemo_door_address", "%s - %s".format("Dokodemo-door", _("Address")), _("Address of the destination server."))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), e.datatype = "host", (e = t.taboption("general", form.Value, "s_dokodemo_door_port", "%s - %s".format("Dokodemo-door", _("Port")), _("Port of the destination server."))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), e.datatype = "port", (e = t.taboption("general", form.MultiValue, "s_dokodemo_door_network", "%s - %s".format("Dokodemo-door", _("Network")), _("If transparent proxy enabled on current inbound, this option will be ignored."))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), e.value("tcp"), e.value("udp"), e.default = "tcp", 
        (e = t.taboption("general", form.Value, "s_dokodemo_door_timeout", "%s - %s".format("Dokodemo-door", _("Timeout")), _("Time limit for inbound data(seconds)"))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), e.datatype = "uinteger", e.placeholder = "300", 
        (e = t.taboption("general", form.Flag, "s_dokodemo_door_follow_redirect", "%s - %s".format("Dokodemo-door", _("Follow redirect")), _("If transparent proxy enabled on current inbound, this option will be ignored."))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), (e = t.taboption("general", form.Value, "s_dokodemo_door_user_level", "%s - %s".format("Dokodemo-door", _("User level")), _("All connections share this level"))).modalonly = !0, 
        e.depends("protocol", "dokodemo-door"), e.datatype = "uinteger", (
        // Settings - HTTP
        e = t.taboption("general", form.Value, "s_http_account_user", "%s - %s".format("HTTP", _("Account user")))).modalonly = !0, 
        e.depends("protocol", "http"), (e = t.taboption("general", form.Value, "s_http_account_pass", "%s - %s".format("HTTP", _("Account password")))).modalonly = !0, 
        e.depends("protocol", "http"), e.password = !0, (e = t.taboption("general", form.Flag, "s_http_allow_transparent", "%s - %s".format("HTTP", _("Allow transparent")))).modalonly = !0, 
        e.depends("protocol", "http"), (e = t.taboption("general", form.Value, "s_http_timeout", "%s - %s".format("HTTP", _("Timeout")), _("Time limit for inbound data(seconds)"))).modalonly = !0, 
        e.depends("protocol", "http"), e.datatype = "uinteger", e.placeholder = "300", (e = t.taboption("general", form.Value, "s_http_user_level", "%s - %s".format("HTTP", _("User level")), _("All connections share this level"))).modalonly = !0, 
        e.depends("protocol", "http"), e.datatype = "uinteger", (
        // Settings - MTProto
        e = t.taboption("general", form.Value, "s_mtproto_user_email", "%s - %s".format("MTProto", _("User email")))).modalonly = !0, 
        e.depends("protocol", "mtproto"), (e = t.taboption("general", form.Value, "s_mtproto_user_secret", "%s - %s".format("MTProto", _("User secret")))).modalonly = !0, 
        e.depends("protocol", "mtproto"), e.password = !0, (e = t.taboption("general", form.Value, "s_mtproto_user_level", "%s - %s".format("MTProto", _("User level")), _("All connections share this level"))).modalonly = !0, 
        e.depends("protocol", "mtproto"), e.datatype = "uinteger", (
        // Settings - Shadowsocks
        e = t.taboption("general", form.Value, "s_shadowsocks_email", "%s - %s".format("Shadowsocks", _("Email")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), (e = t.taboption("general", form.ListValue, "s_shadowsocks_method", "%s - %s".format("Shadowsocks", _("Method")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), e.value(""), e.value("aes-256-cfb"), e.value("aes-128-cfb"), 
        e.value("chacha20"), e.value("chacha20-ietf"), e.value("aes-256-gcm"), e.value("aes-128-gcm"), 
        e.value("chacha20-poly1305"), e.value("chacha20-ietf-poly1305"), (e = t.taboption("general", form.Value, "s_shadowsocks_password", "%s - %s".format("Shadowsocks", _("Password")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), e.password = !0, (e = t.taboption("general", form.Value, "s_shadowsocks_level", "%s - %s".format("Shadowsocks", _("User level")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), e.datatype = "uinteger", (e = t.taboption("general", form.Flag, "s_shadowsocks_ota", "%s - %s".format("Shadowsocks", _("One Time Auth (OTA)")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), (e = t.taboption("general", form.MultiValue, "s_shadowsocks_network", "%s - %s".format("Shadowsocks", _("Network")))).modalonly = !0, 
        e.depends("protocol", "shadowsocks"), e.value("tcp"), e.value("udp"), e.default = "tcp", 
        (
        // Settings - Socks;
        e = t.taboption("general", form.ListValue, "s_socks_auth", "%s - %s".format("Socks", _("Auth")))).modalonly = !0, 
        e.depends("protocol", "socks"), e.value(""), e.value("noauth", _("No Auth")), e.value("password", _("Password")), 
        e.default = "noauth", (e = t.taboption("general", form.Value, "s_socks_account_user", "%s - %s".format("Socks", _("Account user")))).modalonly = !0, 
        e.depends("s_socks_auth", "password"), (e = t.taboption("general", form.Value, "s_socks_account_pass", "%s - %s".format("Socks", _("Account password")))).modalonly = !0, 
        e.depends("s_socks_auth", "password"), e.password = !0, (e = t.taboption("general", form.ListValue, "s_socks_version", "%s - %s".format("Socks", _("Version")))).value(""), 
        e.value("4", "v4"), e.value("4a", "v4a"), e.value("5", "v5"), e.modalonly = !0, 
        e.depends("protocol", "socks"), (e = t.taboption("general", form.Flag, "s_socks_udp", "%s - %s".format("Socks", _("UDP")))).modalonly = !0, 
        e.depends("protocol", "socks"), (e = t.taboption("general", form.Value, "s_socks_ip", "%s - %s".format("Socks", _("IP")), _("When UDP is enabled, V2Ray needs to know the IP address of current host."))).modalonly = !0, 
        e.depends("s_socks_udp", "1");
        for (var n = 0, d = o; n < d.length; n++) {
            l = d[n];
            e.value(l);
        }
        e.datatype = "host", e.placeholder = "127.0.0.1", (e = t.taboption("general", form.Value, "s_socks_user_level", "%s - %s".format("Socks", _("User level")), _("All connections share this level"))).modalonly = !0, 
        e.depends("protocol", "socks"), e.datatype = "uinteger", (
        // Settings - Trojan
        e = t.taboption("general", form.Value, "s_trojan_address", "%s - %s".format("Trojan", _("Address")))).modalonly = !0, 
        e.depends("protocol", "trojan"), e.datatype = "host", (e = t.taboption("general", form.Value, "s_trojan_port", "%s - %s".format("Trojan", _("Port")))).modalonly = !0, 
        e.depends("protocol", "trojan"), e.datatype = "port", (e = t.taboption("general", form.Value, "s_trojan_password", "%s - %s".format("Trojan", _("Password")))).modalonly = !0, 
        e.depends("protocol", "trojan"), (
        // Settings - VMess
        e = t.taboption("general", form.Value, "s_vmess_client_id", "%s - %s".format("VMess", _("Client ID")))).modalonly = !0, 
        e.depends("protocol", "vmess"), (
        // o = s.taboption(
        //   "general",
        //   form.Value,
        //   "s_vmess_client_alter_id",
        //   "%s - %s".format("VMess", _("Client alter ID"))
        // );
        // o.modalonly = true;
        // o.depends("protocol", "vmess");
        // o.datatype = "and(min(0), max(65535))";
        e = t.taboption("general", form.Value, "s_vmess_client_email", "%s - %s".format("VMess", _("Client email")))).modalonly = !0, 
        e.depends("protocol", "vmess"), (e = t.taboption("general", form.Value, "s_vmess_client_user_level", "%s - %s".format("VMess", _("Client User level")))).modalonly = !0, 
        e.depends("protocol", "vmess"), e.datatype = "uinteger", (
        // o = s.taboption(
        //   "general",
        //   form.Value,
        //   "s_vmess_default_alter_id",
        //   "%s - %s".format("VMess", _("Default alter ID"))
        // );
        // o.modalonly = true;
        // o.depends("protocol", "vmess");
        // o.datatype = "and(min(0), max(65535))";
        e = t.taboption("general", form.Value, "s_vmess_default_user_level", "%s - %s".format("VMess", _("Default user level")))).modalonly = !0, 
        e.depends("protocol", "vmess"), e.datatype = "uinteger", (e = t.taboption("general", form.Value, "s_vmess_detour_to", "%s - %s".format("VMess", _("Detour to")), _("Optional feature to suggest client to take a detour. If specified, this inbound will instruct the outbound to use another inbound."))).modalonly = !0, 
        e.depends("protocol", "vmess"), (e = t.taboption("general", form.Flag, "s_vmess_disable_insecure_encryption", "%s - %s".format("VMess", _("Disable insecure encryption")))).modalonly = !0, 
        e.depends("protocol", "vmess"), (
        // Settings - VLESS
        e = t.taboption("general", form.Value, "s_vless_address", "%s - %s".format("VLESS", _("Address")))).modalonly = !0, 
        e.depends("protocol", "vless"), e.datatype = "host", (e = t.taboption("general", form.Value, "s_vless_port", "%s - %s".format("VLESS", _("Port")))).modalonly = !0, 
        e.depends("protocol", "vless"), e.datatype = "port", (e = t.taboption("general", form.Value, "s_vless_user_id", "%s - %s".format("VLESS", _("User ID")))).modalonly = !0, 
        e.depends("protocol", "vless"), (e = t.taboption("general", form.Value, "s_vless_user_level", "%s - %s".format("VLESS", _("User level")))).modalonly = !0, 
        e.depends("protocol", "vless"), e.datatype = "and(uinteger, max(10))", (e = t.taboption("general", form.ListValue, "s_vless_user_encryption", "%s - %s".format("VLESS", _("Encryption")))).modalonly = !0, 
        e.depends("protocol", "vless"), e.value("none", "none"), (
        /** Stream Settings  **/
        e = t.taboption("stream", form.ListValue, "ss_network", _("Network"))).value(""), 
        e.value("tcp", "TCP"), e.value("kcp", "mKCP"), e.value("ws", "WebSocket"), e.value("http", "HTTP/2"), 
        e.value("domainsocket", "Domain Socket"), e.value("quic", "QUIC"), (e = t.taboption("stream", form.ListValue, "ss_security", _("Security"))).modalonly = !0, 
        e.value(""), e.value("none", _("None")), e.value("tls", "TLS"), (
        // XTLS Flows
        e = t.taboption("stream", form.ListValue, "s_xtls_flow", _("xTLS Flow"), _("Use xTLS flow"))).modalonly = !0, 
        e.value("none", _("None")), e.value("xtls-rprx-direct"), e.value("xtls-rprx-direct-udp443"), 
        e.value("xtls-rprx-origin"), e.value("xtls-rprx-origin-udp443"), e.value("xtls-rprx-splice"), 
        e.value("xtls-rprx-splice-udp443"), e.value("xtls-rprx-vision"), e.value("xtls-rprx-vision-udp443"), 
        e.depends("ss_security", "tls"), (
        // Stream Settings - TLS
        e = t.taboption("stream", form.Value, "ss_tls_server_name", "%s - %s".format("TLS", _("Server name")))).modalonly = !0, 
        e.depends("ss_security", "tls"), e.datatype = "host", (e = t.taboption("stream", form.Value, "ss_tls_alpn", "%s - %s".format("TLS", "ALPN"))).modalonly = !0, 
        e.depends("ss_security", "tls"), e.placeholder = "http/1.1", (
        //uTLS
        e = t.taboption("stream", form.ListValue, "u_tls", "uTLS")).modalonly = !0, e.value("", _("None")), 
        e.value("chrome"), e.value("firefox"), e.value("safari"), e.value("randomized"), 
        e.depends("ss_security", "tls"), (e = t.taboption("stream", form.Flag, "ss_tls_rejectUnknownSni", "%s - %s".format("TLS", _("Reject Unknown SNI")))).modalonly = !0, 
        (e = t.taboption("stream", form.Flag, "ss_tls_allow_insecure", "%s - %s".format("TLS", _("Allow insecure")))).modalonly = !0, 
        e.depends("ss_security", "tls"), (e = t.taboption("stream", form.Flag, "ss_tls_allow_insecure_ciphers", "%s - %s".format("TLS", _("Allow insecure ciphers")))).modalonly = !0, 
        e.depends("ss_security", "tls"), (e = t.taboption("stream", form.Flag, "ss_tls_disable_system_root", "%s - %s".format("TLS", _("Disable system root")))).modalonly = !0, 
        e.depends("ss_security", "tls"), (e = t.taboption("stream", form.ListValue, "ss_tls_cert_usage", "%s - %s".format("TLS", _("Certificate usage")))).modalonly = !0, 
        e.depends("ss_security", "tls"), e.value(""), e.value("encipherment"), e.value("verify"), 
        e.value("issue"), (e = t.taboption("stream", form.Value, "ss_tls_cert_fiile", "%s - %s".format("TLS", _("Certificate file")))).modalonly = !0, 
        e.depends("ss_security", "tls"), (e = t.taboption("stream", form.Value, "ss_tls_key_file", "%s - %s".format("TLS", _("Key file")))).modalonly = !0, 
        e.depends("ss_security", "tls"), (
        // Stream Settings - TCP
        e = t.taboption("stream", form.ListValue, "ss_tcp_header_type", "%s - %s".format("TCP", _("Header type")))).modalonly = !0, 
        e.depends("ss_network", "tcp"), e.value(""), e.value("none", _("None")), e.value("http", "HTTP"), 
        (e = t.taboption("stream", form.Value, "ss_tcp_header_request_version", "%s - %s".format("TCP", _("HTTP request version")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), e.placeholder = "1.1", (e = t.taboption("stream", form.ListValue, "ss_tcp_header_request_method", "%s - %s".format("TCP", _("HTTP request method")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), e.value(""), e.value("GET"), e.value("HEAD"), 
        e.value("POST"), e.value("DELETE"), e.value("PUT"), e.value("PATCH"), e.value("OPTIONS"), 
        e.default = "GET", (e = t.taboption("stream", form.Value, "ss_tcp_header_request_path", "%s - %s".format("TCP", _("Request path")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), (e = t.taboption("stream", form.DynamicList, "ss_tcp_header_request_headers", "%s - %s".format("TCP", _("Request headers")), _("A list of HTTP headers, format: <code>header=value</code>. eg: %s").format("Host=www.bing.com"))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), (e = t.taboption("stream", form.Value, "ss_tcp_header_response_version", "%s - %s".format("TCP", _("HTTP response version")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), e.placeholder = "1.1", (e = t.taboption("stream", form.Value, "ss_tcp_header_response_status", "%s - %s".format("TCP", _("HTTP response status")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), e.placeholder = "200", (e = t.taboption("stream", form.Value, "ss_tcp_header_response_reason", "%s - %s".format("TCP", _("HTTP response reason")))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), e.placeholder = "OK", (e = t.taboption("stream", form.DynamicList, "ss_tcp_header_response_headers", "%s - %s".format("TCP", _("Response headers")), _("A list of HTTP headers, format: <code>header=value</code>. eg: %s").format("Host=www.bing.com"))).modalonly = !0, 
        e.depends("ss_tcp_header_type", "http"), (
        // Stream Settings - KCP
        e = t.taboption("stream", form.Value, "ss_kcp_mtu", "%s - %s".format("mKCP", _("Maximum transmission unit (MTU)")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "and(min(576), max(1460))", e.placeholder = "1350", 
        (e = t.taboption("stream", form.Value, "ss_kcp_tti", "%s - %s".format("mKCP", _("Transmission time interval (TTI)")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "and(min(10), max(100))", e.placeholder = "50", 
        (e = t.taboption("stream", form.Value, "ss_kcp_uplink_capacity", "%s - %s".format("mKCP", _("Uplink capacity")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "uinteger", e.placeholder = "5", (e = t.taboption("stream", form.Value, "ss_kcp_downlink_capacity", "%s - %s".format("mKCP", _("Downlink capacity")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "uinteger", e.placeholder = "20", (e = t.taboption("stream", form.Flag, "ss_kcp_congestion", "%s - %s".format("mKCP", _("Congestion enabled")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), (e = t.taboption("stream", form.Value, "ss_kcp_read_buffer_size", "%s - %s".format("mKCP", _("Read buffer size")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "uinteger", e.placeholder = "2", (e = t.taboption("stream", form.Value, "ss_kcp_write_buffer_size", "%s - %s".format("mKCP", _("Write buffer size")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.datatype = "uinteger", e.placeholder = "2", (e = t.taboption("stream", form.ListValue, "ss_kcp_header_type", "%s - %s".format("mKCP", _("Header type")))).modalonly = !0, 
        e.depends("ss_network", "kcp"), e.value(""), e.value("none", _("None")), e.value("srtp", "SRTP"), 
        e.value("utp", "uTP"), e.value("wechat-video", _("Wechat Video")), e.value("dtls", "DTLS 1.2"), 
        e.value("wireguard", "WireGuard"), (
        // Stream Settings - WebSocket
        e = t.taboption("stream", form.Value, "ss_websocket_path", "%s - %s".format("WebSocket", _("Path")))).modalonly = !0, 
        e.depends("ss_network", "ws"), (e = t.taboption("stream", form.DynamicList, "ss_websocket_headers", "%s - %s".format("WebSocket", _("Headers")), _("A list of HTTP headers, format: <code>header=value</code>. eg: %s").format("Host=www.bing.com"))).modalonly = !0, 
        e.depends("ss_network", "ws"), (
        // Stream Settings - HTTP/2
        e = t.taboption("stream", form.DynamicList, "ss_http_host", "%s - %s".format("HTTP/2", _("Host")))).modalonly = !0, 
        e.depends("ss_network", "http"), (e = t.taboption("stream", form.Value, "ss_http_path", "%s - %s".format("HTTP/2", _("Path")))).modalonly = !0, 
        e.depends("ss_network", "http"), e.placeholder = "/", (
        // Stream Settings - Domain Socket
        e = t.taboption("stream", form.Value, "ss_domainsocket_path", "%s - %s".format("Domain Socket", _("Path")))).modalonly = !0, 
        e.depends("ss_network", "domainsocket"), (
        // Stream Settings - QUIC
        e = t.taboption("stream", form.ListValue, "ss_quic_security", "%s - %s".format("QUIC", _("Security")))).modalonly = !0, 
        e.depends("ss_network", "quic"), e.value(""), e.value("none", _("None")), e.value("aes-128-gcm"), 
        e.value("chacha20-poly1305"), (e = t.taboption("stream", form.Value, "ss_quic_key", "%s - %s".format("QUIC", _("Key")))).modalonly = !0, 
        e.depends("ss_quic_security", "aes-128-gcm"), e.depends("ss_quic_security", "chacha20-poly1305"), 
        (e = t.taboption("stream", form.ListValue, "ss_quic_header_type", "%s - %s".format("QUIC", _("Header type")))).modalonly = !0, 
        e.depends("ss_network", "quic"), e.value(""), e.value("none", _("None")), e.value("srtp", "SRTP"), 
        e.value("utp", "uTP"), e.value("wechat-video", _("Wechat Video")), e.value("dtls", "DTLS 1.2"), 
        e.value("wireguard", "WireGuard"), (
        // Stream Settings - Socket Options
        e = t.taboption("stream", form.ListValue, "ss_sockopt_tcp_fast_open", "%s - %s".format(_("Sockopt"), _("TCP fast open")))).modalonly = !0, 
        e.value(""), e.value("0", _("False")), e.value("1", _("True")), (e = t.taboption("stream", form.ListValue, "ss_sockopt_tproxy", "%s - %s".format(_("Sockopt"), _("TProxy")), _("If transparent proxy enabled on current inbound, this option will be ignored."))).modalonly = !0, 
        e.value(""), e.value("redirect", "Redirect"), e.value("tproxy", "TProxy"), e.value("off", _("Off")), 
        /** Other Settings **/
        e = t.taboption("other", form.Value, "tag", _("Tag")), (e = t.taboption("other", form.Flag, "sniffing_enabled", "%s - %s".format(_("Sniffing"), _("Enabled")))).modalonly = !0, 
        (e = t.taboption("other", form.Flag, "routeOnly_enabled", "%s - %s".format(_("routeOnly"), _("Enabled")))).modalonly = !0, 
        (e = t.taboption("other", form.MultiValue, "sniffing_dest_override", "%s - %s".format(_("Sniffing"), _("Dest override")))).modalonly = !0, 
        e.value("http"), e.value("tls"), e.value("fakedns"), e.value("fakedns+others"), 
        (e = t.taboption("other", form.Flag, "metadata_only", "%s - %s".format(_("metadata only"), _("Enabled")))).modalonly = !0, 
        (e = t.taboption("other", form.ListValue, "allocate_strategy", "%s - %s".format(_("Allocate"), _("Strategy")))).modalonly = !0, 
        e.value(""), e.value("always"), e.value("random"), (e = t.taboption("other", form.Value, "allocate_refresh", "%s - %s".format(_("Allocate"), _("Refresh")))).modalonly = !0, 
        e.datatype = "uinteger", (e = t.taboption("other", form.Value, "allocate_concurrency", "%s - %s".format(_("Allocate"), _("Concurrency")))).modalonly = !0;
        e.datatype = "uinteger";

        return m.render();
    }
});