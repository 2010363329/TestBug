
// 完美解决Prop className did not match.服务器：“sc-iBPTVF lhPANS” 客户端：“sc-hBEZvw bTffbp”等类似问题
// 原因：https://github.com/vercel/next.js/discussions/58919
module.exports = {
    compiler: {
        styledComponents: {
            ssr: true,
        },
    },
};
