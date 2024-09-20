module.exports.handler = async function (event, context) {
    const api_key = process.env.API_KEY;

    const query = event.queryStringParameters;

    if (!query.query) {
        return {
            statusCode: 400,
            body: JSON.stringify({})
        };
    }

    const address = query.query;
    const url = `https://geocode-maps.yandex.ru/1.x?apikey=${api_key}&geocode=${address}&format=json`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: response.statusText
                })
            };
        }

        const text = await response.text(); // Получаем текстовый ответ
        let data;

        try {
            data = JSON.parse(text); // Пробуем парсить текст в JSON
        } catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Failed to parse JSON",
                    responseText: text // Возвращаем текст ответа для отладки
                })
            };
        }

        const results = data.response.GeoObjectCollection.featureMember
            .map(member => {
                const geoObject = member.GeoObject;
                const kind = geoObject.metaDataProperty.GeocoderMetaData.kind;
                if (kind !== "locality") return null;

                const pos = geoObject.Point ? geoObject.Point.pos : "N/A";
                const name = geoObject.name;
                const addressComponents = geoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                const provinceComponents = addressComponents.filter(component => component.kind === "province");
                const provinceName = provinceComponents.length > 0 ? provinceComponents[provinceComponents.length - 1].name : "N/A";

                return { name, pos, provinceName };
            })
            .filter(result => result !== null);


        return {
            statusCode: 200,
            body: results
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Internal server error",
                details: error.message,
                url  // Для отладки возвращаем сформированный URL
            })
        };
    }
};