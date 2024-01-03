export const categoryName = {
    'index' : 'главная',
    'fashion' : 'Мода',
    'tech' : 'технологии',
    'politics' : 'политика',
    'sport' : 'спорт'
}

export const categoryId = {
    'index' : 0,
    'fashion' : 3,
    'tech' : 1,
    'politics' : 4,
    'sport' : 2
}

export const beautifyDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric'
    });
}
