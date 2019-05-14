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
            {displayName: 'Regular Expression', value: 'regexp'}
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
            displayName: 'Source String',
            type: 'string'
        }
    ],
    async run (context, type, pattern, as, source) {
        source = source || '';

        if (pattern.length == 0) {
            throw new Error('Replacing Pattern field is required');
        }
        if (type === 'regexp') {
            var isRegExp = /^\/(.+)\/([gimsuy]?)$/.exec(pattern);
            if (isRegExp != null && isRegExp.length == 3) {
                pattern = new RegExp(isRegExp[1], isRegExp[2]);
            } else {
                pattern = new RegExp(isRegExp == null ? pattern : isRegExp[1]);
            }
        }
        return source.replace(pattern, as);
    }
}];
