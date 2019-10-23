require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})



function itemsThatContainText(searchTerm) {
    knexInstance
        .from('shopping_list')
        .select('name', 'price')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

//itemsThatContainText('beef')

function getPageNumber(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage *(pageNumber -1)
    knexInstance
    .from('shopping_list')
    .select('name', 'price')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}

//getPageNumber(2)

function getItemDate(daysAgo){
    knexInstance
        .from('shopping_list')
        .select('name', 'date_added', 'price')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
            )
        .then(result => {
            console.log(result)
        })
}

//getItemDate(10)

function totalCostPerCategory() {
    knexInstance
        .from('shopping_list')
        .select('category')
        .sum('price')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

totalCostPerCategory()