/**
 * 将图片高斯模糊，返回一张高斯模糊的svg矢量图
 * @param {*} url 图片地址
 * @param {*} width 图片宽度，默认100%
 * @param {*} height 图片高度 默认100%
 * @param {*} stdDeviation 高斯程度 默认5
 */
function gaussianBlur(url, width = '100%', height = '100%', stdDeviation = 5) {
  if (typeof url !== 'string') {
    throw new Error('请传入图片地址');
  }
  var id = 'a' + Math.ceil(Math.random() * 10000000);
  return `
    <svg width="${width}" height="${height}">
      <filter id="${id}">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${stdDeviation}"></feGaussianBlur>
      </filter>
      <image xlink:href="${url}"
        filter="url(#${id})" width="${width}" height="${height}">
    </svg>
  `;
}

export default gaussianBlur;