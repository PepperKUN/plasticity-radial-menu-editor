const convertedObj2Table = (originalData:object) => Object.entries(originalData).map(([key, value]) => ({
    '属性名称': key,
    '值': value
}));


export { convertedObj2Table };