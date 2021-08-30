function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {



    let calculator = {
        '+': function (a, b) {
            return +a + +b
        },
        '-': function (a, b) {
            return +a - +b
        },
        '*': function (a, b) {
            return +a * +b
        },
        '/': function (a, b) {
            if (b === 0) {
                throw new Error('TypeError: Division by zero.')
            }
            return +a / +b
        },
    }

    

    let arr = expr.trim().split('')
    let brackets = arr.map(item => {
        return item === '(' || item === ')' ? item : ''
    }).filter(item => item !== '').join('')
    for(let i = 0; i < brackets.length; i++) {
        if (brackets.includes('()')) {
            brackets = brackets.replace(/\(\)/g, '')
        }
        if (!brackets.includes('()') && brackets.length) {
            throw new Error('ExpressionError: Brackets must be paired')
        }
    }



    let first
    let second
    let current

    function math(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '*') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            } else if (arr[i] === '/') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '+') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            } else if (arr[i] === '-') {
                current = calculator[arr[i]](+arr[i - 1], +arr[i + 1])
                arr.splice([i - 1], 3, current)
                i = 0
            }
        }
        
    }

    if (expr.includes(' ') && !expr.includes('(') && !expr.includes(')')) {
        first = expr.split(' ').filter(item => item !== '')
        second = first.concat([])

        math(first)
        return Number(first.join(''))

    } else if (!expr.includes(' ') || !expr.includes('(') || !expr.includes(')')) {
        first = expr.split('').filter(item => item !== ' ')
        second = first.concat([])
        math(first)
        return Number(first.join(''))

    } else {
        first = expr.trim().split(' ').filter(item => item !== '');
        second = first.concat([]);

        let currentlength = second.length
        function findBrackets() {
            first = second.concat([])

            let start
            let end
            for (let i = 0; i < first.length; i++) {
                if (first[i] === '(') {
                    start = i
                }
                for (let j = start; j < first.length; j++) {
                    if (first[j] === ')') {
                        end = j
                        break
                    }
                }
                if (!first.includes('(') && !first.includes(')')) {
                    math(first)
                    return Number(first.join(''))
                }
            }


            let seq = first.splice(start + 1, end - start - 1)
            let seqLength = seq.length

            math(seq)

            second.splice(start, seqLength + 2, seq.join(''))
        }
        
        
        for (let i = 0; i < currentlength; i++) {
            findBrackets()
        }
        return Number(first.join(''))
    }
}

console.log(expressionCalculator(' (  6 + 28 + 18 - (  (  61 + 17 * 64 * 98  ) * (  61 / 53 * 47 / 36 * 98  ) + 82 + (  69 - 55 / (  62 * 77 / 88 - 52 / 10  ) - 42 - (  48 / 84 * 77 + 40 - 13  )  )  )  ) - 4 / 99 '))

module.exports = {
    expressionCalculator
}