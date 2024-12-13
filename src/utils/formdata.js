export function diffDataForm(newData, oldData) {
    let result = {}
    Object.keys(oldData).forEach(key => {
        if (oldData[key] !== newData[key]) {
            result[key] = newData[key]
        }
    })
    return result
}