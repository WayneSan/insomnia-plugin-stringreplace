const REGEXP_REGEXP = /\/((?![*+?])(?:[^\r\n\[\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)\/((?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)/;
const REGEXP_SIMPLE = /((?![*+?])(?:[^\r\n\[\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)/;

module.exports.templateTags = [{
    name: 'replace',
    displayName: 'Replace String',
    description: 'Replace a string by a replacing pattern or Regular Expression',
    args: [
        {
            displayName: 'Pattern Type',
            type: 'enum',
            options: [
                {displayName: 'Normal', value: 'substr'},
                {displayName: 'Regular Expression', value: 'regexp'},
                {displayName: 'Simple Regular Expression (without flags)', value: 'simpleregexp'}
            ]
        },
        {
            displayName: 'Replacing Pattern',
            description: 'A String or Regular Expression that is to be replaced by New String.',
            type: 'string'
        },
        {
            displayName: 'Replace As',
            type: 'string'
        },
        {
            displayName: 'Replace Type',
            type: 'enum',
            options: [
                {displayName: 'Normal', value: ''},
                {displayName: 'Case Insensitive', value: 'i'},
                {displayName: 'Recursive', value: 'g'},
                {displayName: 'Case Insensitive & Recursive', value: 'ig'},
            ],
            hide: args => args[0].value !== 'simpleregexp'
        },
        {
            displayName: 'Source String',
            type: 'string'
        }
    ],
    async run (context, patternType = 'substr', pattern, asString, replaceType, source) {
        source = source || '';

        if (pattern.length == 0) {
            throw new Error('Replacing Pattern field is required.');
        }

        if (patternType === 'simpleregexp') {
            if (REGEXP_SIMPLE.exec(pattern) === null) {
                throw new Error('Invalid Simple Regular Expression syntax.');
            }
            pattern = new RegExp(pattern, replaceType);
        } else if (patternType === 'regexp') {
            var isRegExp = REGEXP_REGEXP.exec(pattern);
            if (isRegExp === null) {
                throw new Error('Invalid Regular Expression syntax.');
            } else if (isRegExp.length == 3) {
                pattern = new RegExp(isRegExp[1], isRegExp[2]);
            } else {
                pattern = new RegExp(isRegExp[1]);
            }
        }

        return source.replace(pattern, asString);
    }
}];
