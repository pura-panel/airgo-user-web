declare namespace API {
  type Access = {
    created_at?: string;
    id?: number;
    name?: string;
    route?: string;
    updated_at?: string;
  };

  type AGNodeStatus = {
    cpu?: number;
    disk?: number;
    id?: number;
    mem?: number;
    uptime?: number;
  };

  type AGOnlineUser = {
    nodeID?: number;
    userNodeMap?: Record<string, any>;
  };

  type AGUserTraffic = {
    id?: number;
    user_traffic?: AGUserTrafficItem[];
  };

  type AGUserTrafficItem = {
    /** Byte */
    download?: number;
    email?: string;
    uid?: number;
    /** Byte */
    upload?: number;
  };

  type AliPay = {
    alipay_ali_public_key?: string;
    alipay_app_id?: string;
    alipay_app_private_key?: string;
    /** alipay 接口内容加密密钥 */
    alipay_encrypt_key?: string;
    alipay_notify_url?: string;
  };

  type AlipayPreCreatePayToFrontend = {
    qr_code?: string;
  };

  type Article = {
    content?: string;
    created_at?: string;
    id?: number;
    introduction?: string;
    status?: boolean;
    title?: string;
    type?: string;
    updated_at?: string;
  };

  type Base64CaptchaInfo = {
    /** 响应时存base64数据，请求时存前端看到的验证码。响应，请求共用该结构体 */
    b64s?: string;
    id?: string;
  };

  type Captcha = {
    img_height?: number;
    img_width?: number;
    key_long?: number;
    open_captcha?: number;
    open_captcha_time_out?: number;
  };

  type CasbinInfo = {
    casbinItems?: CasbinItem[];
    /** 权限id */
    roleID?: number;
  };

  type CasbinItem = {
    /** 方法 */
    method?: string;
    /** 路径 */
    path?: string;
  };

  type Coupon = {
    created_at?: string;
    discount_rate?: number;
    expired_at?: string;
    goods?: Goods[];
    id?: number;
    limit?: number;
    min_amount?: number;
    name?: string;
    updated_at?: string;
  };

  type CustomerService = {
    created_at?: string;
    des?: string;
    duration?: number;
    /** OriginalAmount string `json:"original_amount"  gorm:"comment:原始金额"`
商品参数-基础参数 */
    goods_id?: number;
    goods_type?: string;
    id?: number;
    /** 续费参数 */
    is_renew?: boolean;
    node_connector?: number;
    node_speed_limit?: number;
    price?: string;
    renewal_amount?: string;
    service_end_at?: string;
    service_start_at?: string;
    service_status?: boolean;
    sub_status?: boolean;
    sub_uuid?: string;
    subject?: string;
    /** 商品参数-订阅 */
    total_bandwidth?: number;
    traffic_reset_day?: number;
    updated_at?: string;
    used_down?: number;
    used_up?: number;
    /** 关联用户 */
    user_id?: number;
    user_name?: string;
  };

  type DbTableReq = {
    db_name?: string;
    table_name?: string;
  };

  type Email = {
    email_content?: string;
    email_from?: string;
    email_from_alias?: string;
    email_host?: string;
    email_is_ssl?: boolean;
    email_nickname?: string;
    email_port?: number;
    email_secret?: string;
    email_subject?: string;
  };

  type EmailRequest = {
    email_type: string;
    target_email: string;
  };

  type Epay = {
    /** api地址 */
    epay_api_url?: string;
    /** 商户密钥 */
    epay_key?: string;
    /** 异步通知地址 */
    epay_notify_url?: string;
    /** 商户ID */
    epay_pid?: number;
    /** 页面跳转通知地址 */
    epay_return_url?: string;
    /** 支付方式, alipay	支付宝 wxpay	微信支付 qqpay	QQ钱包 bank	网银支付 */
    epay_type?: string;
  };

  type EpayPreCreatePay = {
    /** 商品金额,如：1.00	单位：元，最大2位小数 */
    money?: string;
    /** 商品名称,如超过127个字节会自动截取 */
    name?: string;
    /** 服务器异步通知地址 */
    notify_url?: string;
    /** 商户订单号 */
    out_trade_no?: string;
    /** 商户ID */
    pid?: number;
    /** 页面跳转通知地址 */
    return_url?: string;
    /** 签名字符串，所有参数按照参数名ASCII码从小到大排序（a-z），sign、sign_type、和空值不参与签名！sign = md5 ( a=b&c=d&e=f + KEY ) （注意：+ 为各语言的拼接符，不是字符！），md5结果为小写。 */
    sign?: string;
    /** 签名类型 */
    sign_type?: string;
    /** 支付方式 */
    type?: string;
  };

  type EpayPreCreatePayToFrontend = {
    epay_api_url?: string;
    epay_pre_create_pay?: EpayPreCreatePay;
  };

  type EpayResultResponse = {
    /** 商品金额 */
    money?: string;
    /** 商品名称 */
    name?: string;
    /** 商户订单号 */
    out_trade_no?: string;
    /** 业务扩展参数 */
    param?: string;
    /** 商户ID */
    pid?: number;
    /** 签名字符串，所有参数按照参数名ASCII码从小到大排序（a-z），sign、sign_type、和空值不参与签名！sign = md5 ( a=b&c=d&e=f + KEY ) （注意：+ 为各语言的拼接符，不是字符！），md5结果为小写。 */
    sign?: string;
    /** 签名类型 */
    sign_type?: string;
    /** 易支付订单号 */
    trade_no?: string;
    /** 支付状态 */
    trade_status?: string;
    /** 支付方式 */
    type?: string;
  };

  type FieldParamsItem = {
    /** = > < <> like */
    condition?: string;
    condition_value?: string;
    field?: string;
    field_type?: string;
    /** AND OR */
    operator?: string;
  };

  type Finance = {
    /** 佣金率, 范围 0~1, 佣金 = 订单金额 * 佣金率 ( 100.50 * 0.50 ) */
    commission_rate?: number;
    /** 是否开启邀请佣金 */
    enable_invitation_commission?: boolean;
    /** 是否开启每日打卡抽奖 */
    enable_lottery?: boolean;
    /** 奖池 */
    jackpot?: JackpotItem[];
    /** 提取到余额的阈值 */
    withdraw_threshold?: number;
  };

  type getCustomerShopGetEnabledGoodsListParams = {
    /** 商品类型 */
    goods_type: string;
  };

  type getPublicAirgoNodeGetNodeInfoParams = {
    /** 节点ID */
    id: number;
    /** 节点密钥 */
    key: string;
  };

  type getPublicAirgoUserAGGetUserlistParams = {
    /** 节点ID */
    id: number;
    /** 节点密钥 */
    key: string;
  };

  type getPublicSubIdNameParams = {
    /** 订阅id */
    id: string;
    /** 自定义订阅名称 */
    name: string;
    /** 客户端类型 */
    type?: string;
  };

  type Goods = {
    coupon?: Coupon[];
    cover_image?: string;
    created_at?: string;
    deliver_text?: string;
    deliver_type?: string;
    des?: string;
    enable_traffic_reset?: boolean;
    /** 基础参数 */
    goods_order?: number;
    goods_type?: string;
    id?: number;
    is_renew?: boolean;
    is_sale?: boolean;
    is_show?: boolean;
    node_connector?: number;
    node_speed_limit?: number;
    /** 关联 */
    nodes?: Node[];
    /** todo 前端修改 */
    price?: string;
    price_12_month?: string;
    /** 订阅参数 */
    price_3_month?: string;
    price_6_month?: string;
    price_unlimited_duration?: string;
    quota?: number;
    /** 充值参数 */
    recharge_amount?: string;
    stock?: number;
    subject?: string;
    total_bandwidth?: number;
    updated_at?: string;
  };

  type JackpotItem = {
    balance?: number;
    weight?: number;
  };

  type JWT = {
    buffer_time?: string;
    expires_time?: string;
    issuer?: string;
    signing_key?: string;
  };

  type Menu = {
    children?: Menu[];
    component?: string;
    created_at?: string;
    id?: number;
    meta?: Meta;
    name?: string;
    parent_id?: number;
    path?: string;
    remarks?: string;
    roles?: Role[];
    updated_at?: string;
  };

  type Meta = {
    icon?: string;
    isAffix?: boolean;
    isHide?: boolean;
    isIframe?: boolean;
    isKeepAlive?: boolean;
    isLink?: string;
    title?: string;
  };

  type Migration = {
    db_address: string;
    db_name: string;
    db_password: string;
    db_port: number;
    db_username: string;
    /** v2board, sspanel */
    panel_type: string;
  };

  type Node = {
    /** 访问控制 */
    access?: Access[];
    address?: string;
    aid?: number;
    allowInsecure?: boolean;
    alpn?: string;
    created_at?: string;
    dest?: string;
    enabled?: boolean;
    encryption?: string;
    flow?: string;
    fp?: string;
    /** 关联参数 */
    goods?: Goods[];
    host?: string;
    hy_down_mbps?: number;
    hy_obfs?: string;
    hy_obfs_password?: string;
    hy_ports?: string;
    hy_up_mbps?: number;
    id?: number;
    mode?: string;
    network?: string;
    node_order?: number;
    node_speed_limit?: number;
    node_type?: string;
    path?: string;
    pbk?: string;
    port?: number;
    private_key?: string;
    /** 一些协议参数 */
    protocol?: string;
    /** 基础参数 */
    remarks?: string;
    scy?: string;
    security?: string;
    server_key?: string;
    service_name?: string;
    sid?: string;
    sni?: string;
    spx?: string;
    /** Byte */
    total_down?: number;
    /** 已用上行/已用下行，统计节点流量时使用 */
    total_up?: number;
    traffic_rate?: number;
    /** 中转参数 */
    transfer_address?: string;
    transfer_node_id?: number;
    transfer_port?: number;
    type?: string;
    updated_at?: string;
    /** 共享节点需要的uuid;订阅下发是实际的用户uuid */
    uuid?: string;
    v?: string;
  };

  type NodeSharedReq = {
    url?: string;
  };

  type Notice = {
    admin_id?: string;
    bot_token?: string;
    enable_email?: boolean;
    enable_tg_bot?: boolean;
    enable_web_mail?: boolean;
    tg_socks5?: string;
    when_new_ticket?: boolean;
    when_node_offline?: boolean;
    when_user_purchased?: boolean;
    when_user_registered?: boolean;
  };

  type Order = {
    balance_amount?: string;
    buyer_logon_id?: string;
    buyer_pay_amount?: string;
    coupon_amount?: string;
    coupon_id?: number;
    coupon_name?: string;
    created_at?: string;
    /** 服务参数 */
    customer_service_id?: number;
    deliver_text?: string;
    deliver_type?: string;
    des?: string;
    duration?: number;
    /** 商品参数 */
    goods_id?: number;
    goods_type?: string;
    id?: number;
    order_remarks?: string;
    order_type?: string;
    original_amount?: string;
    out_trade_no?: string;
    /** 支付参数 */
    pay_id?: number;
    /** 支付信息，epay，alipay等" */
    pay_info?: PreCreatePayToFrontend;
    pay_type?: string;
    price?: string;
    subject?: string;
    total_amount?: string;
    trade_no?: string;
    trade_status?: string;
    updated_at?: string;
    /** 关联用户 */
    user_id?: number;
    user_name?: string;
  };

  type Pagination = {
    order_by?: string;
    page_num?: number;
    page_size?: number;
  };

  type Pay = {
    alipay?: AliPay;
    created_at?: string;
    epay?: Epay;
    id?: number;
    /** 别名 */
    name?: string;
    /** logo url */
    pay_logo_url?: string;
    /** 支付类型：alipay epay balance */
    pay_type?: string;
    /** true:启用 */
    status?: boolean;
    updated_at?: string;
  };

  type postPublicAirgoNodeAGReportNodeStatusParams = {
    /** 节点密钥 */
    key: string;
  };

  type postPublicAirgoUserAGReportNodeOnlineUsersParams = {
    /** 节点密钥 */
    key: string;
  };

  type postPublicAirgoUserAGReportUserTrafficParams = {
    /** 节点密钥 */
    key: string;
  };

  type PreCreatePayToFrontend = {
    alipay_info?: AlipayPreCreatePayToFrontend;
    epay_info?: EpayPreCreatePayToFrontend;
  };

  type PushCustomerServiceRequest = {
    customer_service_id?: number;
    to_user_name?: string;
  };

  type QueryParams = {
    field_params_list?: FieldParamsItem[];
    /** 分页参数 */
    pagination?: Pagination;
    table_name: string;
  };

  type RateLimitParams = {
    ip_role_param?: number;
    visit_param?: number;
  };

  type ResponseStruct = {
    code?: number;
    data?: any;
    msg?: string;
  };

  type Role = {
    casbins?: CasbinItem[];
    created_at?: string;
    description?: string;
    id?: number;
    menus?: Menu[];
    role_name?: string;
    status?: boolean;
    updated_at?: string;
    user_group?: User[];
  };

  type Security = {
    captcha?: Captcha;
    jwt?: JWT;
    rate_limit_params?: RateLimitParams;
  };

  type Server = {
    created_at?: string;
    email?: Email;
    finance?: Finance;
    id?: number;
    notice?: Notice;
    security?: Security;
    subscribe?: Subscribe;
    updated_at?: string;
    website?: Website;
  };

  type Subscribe = {
    backend_url?: string;
    clash_rule?: string;
    sub_name?: string;
    subscribe_domain_bind_request?: boolean;
    surge_rule?: string;
    tek?: string;
  };

  type Theme = {
    animation?: string;
    columnsAsideLayout?: string;
    columnsAsideStyle?: string;
    /** 分栏设置 */
    columnsMenuBar?: string;
    columnsMenuBarColor?: string;
    /** 是否开启布局配置抽屉 */
    created_at?: string;
    globalComponentSize?: string;
    globalI18n?: string;
    /** 全局网站标题 / 副标题
网站主标题（菜单导航、浏览器当前网页标题） */
    globalTitle?: string;
    globalViceTitle?: string;
    globalViceTitleMsg?: string;
    id?: number;
    isBreadcrumb?: boolean;
    isCacheTagsView?: boolean;
    isClassicSplitMenu?: boolean;
    /** 界面设置 */
    isCollapse?: boolean;
    isColumnsMenuBarColorGradual?: boolean;
    isColumnsMenuHoverPreload?: boolean;
    isDrawer?: boolean;
    isFixedHeader?: boolean;
    isFixedHeaderChange?: boolean;
    isFooter?: boolean;
    isGrayscale?: boolean;
    isInvert?: boolean;
    isIsDark?: boolean;
    isLockScreen?: boolean;
    isMenuBarColorGradual?: boolean;
    isShareTagsView?: boolean;
    /** 界面显示 */
    isShowLogo?: boolean;
    isShowLogoChange?: boolean;
    isSortableTagsView?: boolean;
    isTagsview?: boolean;
    isTagsviewIcon?: boolean;
    isTopBarColorGradual?: boolean;
    isUniqueOpened?: boolean;
    isWartermark?: boolean;
    /** 布局切换
注意：为了演示，切换布局时，颜色会被还原成默认，代码位置：/@/layout/navBars/breadcrumb/setings.vue
中的 `initSetLayoutChange(设置布局切换，重置主题样式)` 方法
布局切换：可选值"<defaults|classic|transverse|columns>"，默认 defaults */
    layout?: string;
    lockScreenTime?: number;
    logo_link?: string;
    /** 菜单设置 */
    menuBar?: string;
    menuBarActiveColor?: string;
    menuBarColor?: string;
    /** 全局主题 */
    primary?: string;
    /** 其它设置
Tagsview 风格：可选值"<tags-style-one|tags-style-four|tags-style-five>"，默认 tags-style-five
定义的值与 `/src/layout/navBars/tagsView/tagsView.vue` 中的 class 同名 */
    tagsStyle?: string;
    /** 顶栏设置 */
    topBar?: string;
    topBarColor?: string;
    updated_at?: string;
    wartermarkText?: string;
  };

  type Ticket = {
    created_at?: string;
    details?: string;
    id?: number;
    /** TicketProcessing TicketClosed */
    status?: string;
    /** 一对多关联 */
    ticket_message?: TicketMessage[];
    title?: string;
    updated_at?: string;
    user_id?: number;
  };

  type TicketMessage = {
    created_at?: string;
    id?: number;
    is_admin?: boolean;
    message?: string;
    ticket_id?: number;
    updated_at?: string;
  };

  type User = {
    avatar?: string;
    balance?: number;
    created_at?: string;
    enable?: boolean;
    enable_email?: boolean;
    /** 通知参数 */
    enable_tg_bot?: boolean;
    enable_web_mail?: boolean;
    id?: number;
    invitation_code?: string;
    nick_name?: string;
    /** 订单，has many */
    orders?: Order[];
    password?: string;
    referrer_user_id?: number;
    /** 关联参数 */
    role_group?: Role[];
    tg_id?: number;
    updated_at?: string;
    user_name?: string;
    when_balance_changed?: boolean;
    when_purchased?: boolean;
    when_service_almost_expired?: boolean;
  };

  type UserChangeAvatarRequest = {
    avatar?: string;
  };

  type UserChangePasswordRequest = {
    email_code?: string;
    /** 密码 */
    password: string;
    /** 密码 */
    re_password: string;
  };

  type UserLoginRequest = {
    /** 邮箱验证码 */
    email_code?: string;
    /** 密码 */
    password: string;
    /** 用户名 */
    user_name: string;
  };

  type UserRegister = {
    base64_captcha?: Base64CaptchaInfo;
    /** 邮箱验证码 */
    email_code?: string;
    /** 邮箱后缀 */
    email_suffix: string;
    /** 密码 */
    password: string;
    /** 密码 */
    re_password: string;
    referrer_code?: string;
    /** 用户名 */
    user_name: string;
  };

  type Website = {
    acceptable_email_suffixes?: string;
    enable_assets_api?: boolean;
    enable_base64_captcha?: boolean;
    enable_email_code?: boolean;
    enable_login_email_code?: boolean;
    enable_register?: boolean;
    enable_swagger_api?: boolean;
    frontend_url?: string;
    is_multipoint?: boolean;
  };
}
