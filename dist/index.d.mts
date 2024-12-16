import NeteaseCloudMusicApi from 'NeteaseCloudMusicApi';

declare enum MusicSearchType {
    single = 1,// 单曲
    album = 2,// 专辑
    artist = 3,// 歌手
    playlist = 4,// 歌单
    user = 5,// 用户
    mv = 6,// mv
    lyric = 7,// 歌词
    dj = 8
}
declare const enum SongQualityType {
    standard = "standard",
    exhigh = "exhigh",
    lossless = "lossless",
    hires = "hires",
    jyeffect = "jyeffect",
    jymaster = "jymaster",
    sky = "sky"
}

declare const netease: {
    search: (keywords: string, limit: number, offset: number, type: MusicSearchType) => Promise<{} | undefined>;
    song_url: (ids: number[], quality: SongQualityType) => Promise<{
        [key: string]: string;
    } | undefined>;
    song_list: (id: string) => Promise<unknown>;
    lyric: (id: string) => Promise<{
        lyric: {}[] | {
            lyric: {}[];
            translate: {}[];
        };
        translate: any[];
    } | undefined>;
    activate_init_profile(params: {
        nickname: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_detail(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_detail_dynamic(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_list(params: {
        area?: NeteaseCloudMusicApi.AlbumListArea;
        type: string;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_list_style(params: {
        area?: NeteaseCloudMusicApi.AlbumListStyleArea;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_new(params: {
        area?: NeteaseCloudMusicApi.AlbumListArea;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_newest(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_songsaleboard(params: {
        albumType?: NeteaseCloudMusicApi.AlbumSongsaleboardAlbumType;
        type?: NeteaseCloudMusicApi.AlbumSongsaleboardType;
        year?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_sub(params: {
        id: string | number;
        t: NeteaseCloudMusicApi.SubAction;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    album_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_album(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_desc(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_list(params: {
        area: NeteaseCloudMusicApi.ArtistArea;
        initial?: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
        type?: NeteaseCloudMusicApi.ArtistType;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_mv(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_songs(params: {
        id: string | number;
        order?: NeteaseCloudMusicApi.ArtistSongsOrder;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_sub(params: {
        id: string | number;
        t: NeteaseCloudMusicApi.SubAction;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_top_song(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artists(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    audio_match(params: {
        duration: string | number;
        audioFP: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    avatar_upload(params: NeteaseCloudMusicApi.ImageUploadConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    banner(params: {
        type?: NeteaseCloudMusicApi.BannerType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    batch(params: {
        [index: string]: unknown;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    captcha_sent(params: {
        phone: string;
        ctcode?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    captcha_verify(params: {
        ctcode?: number | string;
        phone: number | string;
        captcha: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    cellphone_existence_check(params: {
        phone: number | string;
        countrycode: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    check_music(params: {
        id: string | number;
        br: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    cloudsearch(params: {
        keywords: string;
        type?: NeteaseCloudMusicApi.SearchType;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        id: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        t: NeteaseCloudMusicApi.CommentAction.delete;
        commentId: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        type: NeteaseCloudMusicApi.CommentType.event;
        t: NeteaseCloudMusicApi.CommentAction.delete;
        threadId: string;
        commentId: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        id: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        t: NeteaseCloudMusicApi.CommentAction.add;
        content: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        type: NeteaseCloudMusicApi.CommentType.event;
        t: NeteaseCloudMusicApi.CommentAction.add;
        threadId: string;
        content: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        id: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        t: NeteaseCloudMusicApi.CommentAction.reply;
        content: string | number;
        commentId: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment(params: {
        type: NeteaseCloudMusicApi.CommentType.event;
        t: NeteaseCloudMusicApi.CommentAction.reply;
        threadId: string;
        content: string | number;
        commentId: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_album(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_dj(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_event(params: {
        threadId: string;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_floor(params: {
        id: string | number;
        parentCommentId: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        limit?: string | number;
        time?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_hot(params: {
        id: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_hotwall_list(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_like(params: {
        id: string | number;
        type: NeteaseCloudMusicApi.CommentType;
        t: NeteaseCloudMusicApi.SubAction;
        cid: string | number;
        threadId?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_music(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_mv(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_playlist(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_video(params: {
        id: string | number;
        before?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    countries_code_list(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    daily_signin(params: {
        type?: NeteaseCloudMusicApi.DailySigninType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    digitalAlbum_ordering(params: {
        payment: string;
        id: string | number;
        quantity: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    digitalAlbum_purchased(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_banner(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_category_excludehot(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_category_recommend(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_catelist(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_detail(params: {
        rid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_hot(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_paygift(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_personalize_recommend(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_program(params: {
        rid: string | number;
        asc: "true" | 1 | "false" | 0;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_program_detail(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_program_toplist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_program_toplist_hours(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_radio_hot(params: {
        cateId: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_recommend(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_recommend_type(params: {
        type: number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_sub(params: {
        t: NeteaseCloudMusicApi.SubAction;
        rid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_today_perfered(params: {
        page?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_toplist(params: {
        type?: NeteaseCloudMusicApi.ListOrder;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_toplist_hours(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_toplist_newcomer(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_toplist_pay(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_toplist_popular(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    event(params: {
        pagesize?: number;
        lasttime?: number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    event_del(params: {
        evId: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    event_forward(params: {
        forwords: string;
        evId: string | number;
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    fm_trash(params: {
        id: string | number;
        time?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    follow(params: {
        t: NeteaseCloudMusicApi.SubAction;
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    history_recommend_songs(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    history_recommend_songs_detail(params: {
        date?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    homepage_block_page(params: {
        refresh?: "true" | "false" | boolean;
        cursor?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    homepage_dragon_ball(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    hot_topic(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    like(params: {
        like?: "true" | "false" | boolean;
        id: string | number;
        alg?: string;
        time?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    likelist(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login(params: {
        email: string;
        password: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login(params: {
        email: string;
        md5_password: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_cellphone(params: {
        phone: number | string;
        countrycode?: number | string;
        password: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_cellphone(params: {
        phone: number | string;
        countrycode?: number | string;
        md5_password: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_cellphone(params: {
        phone: number | string;
        countrycode?: number | string;
        captcha: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_refresh(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_status(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    logout(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    lyric_new(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_comments(params: {
        uid: string | number;
        before?: string | number;
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_forwards(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_notices(params: {
        limit?: string | number;
        lasttime?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_private(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_private_history(params: {
        before?: string | number;
        limit?: string | number;
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_all(params: {
        area?: NeteaseCloudMusicApi.MvArea;
        type?: NeteaseCloudMusicApi.MvType;
        order?: NeteaseCloudMusicApi.MvOrder;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_detail(params: {
        mvid?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_detail_info(params: {
        mvid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_exclusive_rcmd(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_first(params: {
        area?: NeteaseCloudMusicApi.MvArea;
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_sub(params: {
        t: NeteaseCloudMusicApi.SubAction;
        mvid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mv_url(params: {
        id?: string | number;
        r?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personal_fm(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized(params: {
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized_djprogram(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized_mv(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized_newsong(params: {
        area?: string | number;
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized_privatecontent(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    personalized_privatecontent_list(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_catlist(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_cover_update(params: {
        id: string;
    } & NeteaseCloudMusicApi.ImageUploadConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_create(params: {
        name: string;
        privacy: 0 | 10;
        type?: NeteaseCloudMusicApi.PlaylistType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_delete(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_desc_update(params: {
        id: string | number;
        desc: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_detail(params: {
        id: string | number;
        s?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_highquality_tags(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_hot(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_name_update(params: {
        id: string | number;
        name: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_order_update(params: {
        ids: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_subscribe(params: {
        t: NeteaseCloudMusicApi.SubAction;
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_subscribers(params: {
        id?: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_tags_update(params: {
        id: string | number;
        tags: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_tracks(params: {
        op: "add" | "del";
        pid: string | number;
        tracks: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_update(params: {
        id: string | number;
        name: string;
        desc?: string;
        tags?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playmode_intelligence_list(params: {
        id: string | number;
        pid: string | number;
        sid?: string | number;
        count?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    program_recommend(params: {
        type: string;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    rebind(params: {
        captcha: string;
        phone: string;
        oldcaptcha: string;
        ctcode?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    recommend_resource(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    recommend_songs(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    register_cellphone(params: {
        captcha: string;
        phone: string;
        password: string;
        nickname: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    related_allvideo(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    related_playlist(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    resource_like(params: {
        t: NeteaseCloudMusicApi.SubAction;
        type: NeteaseCloudMusicApi.ResourceType;
        id?: string | number;
        threadId?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    scrobble(params: {
        id: string | number;
        sourceid: string | number;
        time: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    search_default(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    search_hot(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    search_hot_detail(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    search_multimatch(params: {
        type?: number;
        keywords: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    search_suggest(params: {
        keywords: string;
        type?: NeteaseCloudMusicApi.SearchSuggestType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    send_playlist(params: {
        playlist: string | number;
        msg: string;
        user_ids: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    send_text(params: {
        msg: string;
        user_ids: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    setting(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    share_resource(params: {
        type?: NeteaseCloudMusicApi.ShareResourceType;
        msg?: string;
        id?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    simi_artist(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    simi_mv(params: {
        mvid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    simi_playlist(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    simi_song(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    simi_user(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    song_detail(params: {
        ids: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response<{
        songs: NeteaseCloudMusicApi.SongDetail[];
        privileges: unknown[];
        code: number;
    }>>;
    song_order_update(params: {
        pid: string | number;
        ids: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    song_url_v1(params: {
        id: string | number;
        level: NeteaseCloudMusicApi.SoundQualityType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_album(params: {
        area?: NeteaseCloudMusicApi.AlbumListArea;
        type?: NeteaseCloudMusicApi.ListOrder;
        year?: string;
        mouth?: string;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_artists(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_list(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_mv(params: {
        area?: NeteaseCloudMusicApi.MvArea;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_playlist(params: {
        cat?: string;
        order?: NeteaseCloudMusicApi.ListOrder;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_playlist_highquality(params: {
        cat?: string;
        before?: string | number;
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    top_song(params: {
        type: NeteaseCloudMusicApi.TopSongType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    toplist(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    toplist_artist(params: {
        type?: NeteaseCloudMusicApi.ToplistArtistType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    toplist_detail(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_audio(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_cloud(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_cloud_del(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_cloud_detail(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_detail(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_dj(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_event(params: {
        lasttime?: string | number;
        limit?: string | number;
        uid: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_followeds(params: {
        uid: string | number;
        lasttime?: string | number;
        limit?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_follows(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_level(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_playlist(params: {
        uid: string | number;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_record(params: {
        uid: string | number;
        type?: NeteaseCloudMusicApi.UserRecordType;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_subcount(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_update(params: {
        birthday: string;
        city: string;
        gender: string;
        nickname: string;
        province: string;
        signature: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_category_list(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_detail(params: {
        id: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_detail_info(params: {
        vid: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_group(params: {
        id: string;
        offset?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_group_list(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_sub(params: {
        t?: NeteaseCloudMusicApi.SubAction;
        id: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_timeline_all(params: {
        offset?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_timeline_recommend(params: {
        offset?: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    video_url(params: {
        id: string | number;
        res?: number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    weblog(params: {
        data?: {
            [index: string]: unknown;
        };
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_mylike(params: {
        time?: number | string;
        limit: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_track_add(params: {
        pid?: number | string;
        ids: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_track_delete(params: {
        pid?: number | string;
        ids: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_new(params: {
        type?: number | string;
        id: number | string;
        pageNo?: number | string;
        pageSize?: number | string;
        sortType?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    calendar(params: {
        startTime?: number | string;
        endTime: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_video_recent(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_binding(params: {
        uid?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_replacephone(params: {
        phone: number | string;
        captcha: number | string;
        oldcaptcha: number | string;
        countrycode?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_safe(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    dj_subscriber(params: {
        id: number | string;
        limit?: number | string;
        time?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_account(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_info(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_sign(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_receipt(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_expense(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_tasks(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_today(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_tasks_todo(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_task_finish(params: {
        userTaskId: number | string;
        depositCode?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    msg_recentcontact(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    hug_comment(params: {
        uid: number | string;
        cid: number | string;
        sid: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    comment_hug_list(params: {
        page: number | string;
        cursor: number | string;
        idCursor: number | string;
        pageSize?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    topic_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    topic_sublist(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_new_mv(params: {
        limit?: number | string;
        startTimestamp?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_new_song(params: {
        limit?: number | string;
        startTimestamp?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_detail(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    cloud(params: {
        songFile: {
            name: string;
            data: Buffer;
        };
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    topic_detail(params: {
        actid?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    topic_detail_event_hot(params: {
        actid?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_qr_key(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_qr_create(params: {
        key?: number | string;
        qrimg?: boolean | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    login_qr_check(params: {
        key?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_detail_dynamic(params: {
        id: string | number;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_bindingcellphone(params: {
        phone: number | string;
        captcha: number | string;
        countrycode?: number | string;
        password?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    listen_together_status(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    user_comment_history(params: {
        limit?: number | string;
        uid: number | string;
        time?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    cloud_match(params: {
        uid: number | string;
        sid: number | string;
        asid: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_rcmd_song(params: {
        id: number | string;
        reason?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    yunbei_rcmd_song_history(params: {
        size?: number | string;
        cursor?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    song_purchased(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mlog_url(params: {
        id?: number | string;
        res?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    mlog_to_video(params: {
        id?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_growthpoint(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_growthpoint_details(params: NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_tasks(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_growthpoint_get(params: {
        ids?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_fans(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    digitalAlbum_detail(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    digitalAlbum_sales(params: {
        ids: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_data_overview(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_play_trend(params: {
        startTime: number | string;
        endTime: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_tasks(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_cloudbean(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_cloudbean_obtain(params: {
        id: number | string;
        period: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_info(params: {
        uid?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_info_v2(params: {
        uid?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_sign(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    song_download_url(params: {
        id: number | string;
        br?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_track_all(params: {
        id: number | string;
        s?: number | string;
    } & NeteaseCloudMusicApi.MultiPageConfig & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    artist_video(params: {
        id: number | string;
        size?: number | string;
        cursor?: number | string;
        order?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    sign_happy_info(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_song(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_video(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_voice(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_playlist(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_album(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    record_recent_dj(params: {
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    signin_progress(params: {
        moduleId?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    nickname_check(params: {
        nickname: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    musician_tasks_new(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    playlist_update_playcount(params: {
        id?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    vip_timemachine(params: {
        startTime?: number | string;
        endTime?: number | string;
        limit?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    song_wiki_summary(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    sheet_list(params: {
        id: number | string;
        abTest?: "a" | "b";
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    sheet_preview(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_list(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_preference(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_detail(params: {
        tagId: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_song(params: {
        tagId: number | string;
        size?: number | string;
        cursor?: number | string;
        sort?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_album(params: {
        tagId: number | string;
        size?: number | string;
        cursor?: number | string;
        sort?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_playlist(params: {
        tagId: number | string;
        size?: number | string;
        cursor?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    style_artist(params: {
        tagId: number | string;
        size?: number | string;
        cursor?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    pl_count(params: NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    get_userids(params: {
        nicknames: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    voicelist_list_search(params: {
        limit?: string | number;
        offset?: string | number;
        name?: string;
        displayStatus?: string;
        type?: string;
        voiceFeeType?: string | number;
        radioId?: string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    voice_delete(params: {
        ids: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    djRadio_top(params: {
        djRadioId?: number | string;
        sortIndex?: number | string;
        dataGapDays?: number | string;
        dataType?: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    voice_lyric(params: {
        id: number | string;
    } & NeteaseCloudMusicApi.RequestBaseConfig): Promise<NeteaseCloudMusicApi.Response>;
    SubAction: typeof NeteaseCloudMusicApi.SubAction;
    AlbumListArea: typeof NeteaseCloudMusicApi.AlbumListArea;
    ListOrder: typeof NeteaseCloudMusicApi.ListOrder;
    AlbumListStyleArea: typeof NeteaseCloudMusicApi.AlbumListStyleArea;
    AlbumSongsaleboardType: typeof NeteaseCloudMusicApi.AlbumSongsaleboardType;
    AlbumSongsaleboardAlbumType: typeof NeteaseCloudMusicApi.AlbumSongsaleboardAlbumType;
    ArtistListArea: typeof NeteaseCloudMusicApi.ArtistListArea;
    ArtistArea: typeof NeteaseCloudMusicApi.ArtistArea;
    ArtistType: typeof NeteaseCloudMusicApi.ArtistType;
    ArtistSongsOrder: typeof NeteaseCloudMusicApi.ArtistSongsOrder;
    BannerType: typeof NeteaseCloudMusicApi.BannerType;
    SearchType: typeof NeteaseCloudMusicApi.SearchType;
    CommentType: typeof NeteaseCloudMusicApi.CommentType;
    CommentAction: typeof NeteaseCloudMusicApi.CommentAction;
    DailySigninType: typeof NeteaseCloudMusicApi.DailySigninType;
    MvArea: typeof NeteaseCloudMusicApi.MvArea;
    MvType: typeof NeteaseCloudMusicApi.MvType;
    MvOrder: typeof NeteaseCloudMusicApi.MvOrder;
    ResourceType: typeof NeteaseCloudMusicApi.ResourceType;
    SearchSuggestType: typeof NeteaseCloudMusicApi.SearchSuggestType;
    ShareResourceType: typeof NeteaseCloudMusicApi.ShareResourceType;
    SoundQualityType: typeof NeteaseCloudMusicApi.SoundQualityType;
    TopSongType: typeof NeteaseCloudMusicApi.TopSongType;
    ToplistArtistType: typeof NeteaseCloudMusicApi.ToplistArtistType;
    UserRecordType: typeof NeteaseCloudMusicApi.UserRecordType;
};

declare const qq: {
    search: (keywords: string, limit: number, offset: number, type: MusicSearchType) => Promise<any>;
    song_url: (ids: string[], quality: SongQualityType) => Promise<{
        [key: string]: string;
    } | undefined>;
    song_list: (diss_id: string) => Promise<any>;
    set_cookie: (cookie_str: string) => void;
    lyric: (id: string) => Promise<{
        lyric: {}[] | {
            lyric: {}[];
            translate: {}[];
        };
        translate: {}[] | {
            lyric: {}[];
            translate: {}[];
        };
    } | undefined>;
};

declare const test: () => void;

interface BaseResponsePack<Data> {
    readonly status: number;
    readonly rawBody: Response;
    readonly data: Data;
}
declare class ResponsePack<Data> implements BaseResponsePack<Data | undefined> {
    readonly status: number;
    readonly rawBody: Response;
    readonly data: Data | undefined;
    constructor(status: number, rawBody: Response, data: Data | undefined);
}
declare class ListResponsePack<Element> implements BaseResponsePack<Array<Element>> {
    readonly status: number;
    readonly rawBody: Response;
    readonly data: Array<Element>;
    constructor(status: number, rawBody: Response, data: Array<Element>);
}

/**
 * 用于确定正在处理的搜索结果的位置，包含分页，每页的数量等信息, 用于 `SearchResult`
 *
 * @example
 * 使用 SearchResultPosition 的 demo
 * ```typescript
 * // 偏移 20 条数据，每一批数据有 10 条
 * const position: SearchResultPosition = {
 *    limit: 10,
 *    offset: 20,
 * }
 * ```
 * @see SearchResult
 */
interface SearchResultPosition {
    /**
     * 每页拥有的数据量
     */
    limit: number;
    /**
     * 结果偏移量
     */
    offset: number;
}
/**
 * 请求数据的函数类型，用于 `SearchResult`
 * @see SearchResult
 */
type FetchResultFunc<SearchOptions, Result> = (options: SearchOptions, position: SearchResultPosition) => Promise<Result | undefined>;
/**
 * 搜索结果处理类，支持分页等操作
 */
declare class SearchResult<SearchOptions, Result> {
    private searchOptions;
    private fetchFunc;
    private position;
    private static readonly DEFAULT_LIMIT;
    constructor(searchOptions: SearchOptions, fetchFunc: FetchResultFunc<SearchOptions, Result>, position?: SearchResultPosition);
    /**
     * 重新定义 limit
     * @param limit 新的 limit
     * @see SearchResultPosition
     */
    limit(limit: number): this;
    /**
     * 重新定义 offset
     * @param offset 新的 offset
     * @see SearchResultPosition
     */
    offset(offset: number): this;
    /**
     * 异步地请求下一批数据
     */
    nextPage(): Promise<Result | undefined>;
}

export { type BaseResponsePack, type FetchResultFunc, ListResponsePack, ResponsePack, SearchResult, type SearchResultPosition, netease, qq, test };
