/* tslint:disable */
/* eslint-disable */

export const AllTypesProps = {
	SendGridAPI:{
		addMember:{
			memberEmail:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	}
}

export const ReturnTypes = {
	Query:{
		sendgrid:"SendGridAPI"
	},
	SendGridAPI:{
		addMember:"Boolean"
	}
}

export class GraphQLError extends Error {
    constructor(response) {
      super("");
      this.response = response;
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


export const ScalarResolver = (scalar, value) => {
  switch (scalar) {
    case 'String':
      return  `"${value.replace(/"/g, '\\\"')}"`;
    case 'Int':
      return `${value}`;
    case 'Float':
      return `${value}`;
    case 'Boolean':
      return `${value}`;
    case 'ID':
      return `"${value}"`;
    case 'enum':
      return `${value}`;
    case 'scalar':
      return `${value}`;
    default:
      return false;
  }
};

export const TypesPropsResolver = ({
  value,
  type,
  name,
  key,
  blockArrays
}) => {
  if (value === null) {
    return `null`;
  }
  let resolvedValue = AllTypesProps[type][name];
  if (key) {
    resolvedValue = resolvedValue[key];
  }
  if (!resolvedValue) {
    throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
  }
  const typeResolved = resolvedValue.type;
  const isArray = resolvedValue.array;
  if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
    const isRequired = resolvedValue.required ? '!' : ''
    return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${typeResolved}${isRequired}`;
  }
  if (isArray && !blockArrays) {
    return `[${value
      .map((v) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
      .join(',')}]`;
  }
  const reslovedScalar = ScalarResolver(typeResolved, value);
  if (!reslovedScalar) {
    const resolvedType = AllTypesProps[typeResolved];
    if (typeof resolvedType === 'object') {
      const argsKeys = Object.keys(resolvedType);
      return `{${argsKeys
        .filter((ak) => value[ak] !== undefined)
        .map(
          (ak) => `${ak}:${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}`
        )}}`;
    }
    return ScalarResolver(AllTypesProps[typeResolved], value);
  }
  return reslovedScalar;
};

const isArrayFunction = (
  parent,
  a
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const keyValues = Object.keys(values);

  if (!keys.length) {
      return keyValues.length > 0
        ? `(${keyValues
            .map(
              (v) =>
                `${v}:${TypesPropsResolver({
                  value: values[v],
                  type: mainKey,
                  name: key,
                  key: v
                })}`
            )
            .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
        : traverseToSeekArrays(parent, r);
    }

  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};

const resolveKV = (k, v) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;

const objectToTree = (o) =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`).join(' ')}}`;

const traverseToSeekArrays = (parent, a) => {
if (!a) return '';
if (Object.keys(a).length === 0) {
  return '';
}
let b = {};
if (Array.isArray(a)) {
  return isArrayFunction([...parent], a);
} else {
  if (typeof a === 'object') {
    Object.keys(a).map((k) => {
      if (k === '__alias') {
        Object.keys(a[k]).map((aliasKey) => {
          const aliasOperations = a[k][aliasKey];
          const aliasOperationName = Object.keys(aliasOperations)[0];
          const aliasOperation = aliasOperations[aliasOperationName];
          b[
            `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
          ] = traverseToSeekArrays([...parent, aliasOperationName], aliasOperation);
        });
      } else {
        b[k] = traverseToSeekArrays([...parent, k], a[k]);
      }
    });
  } else {
    return '';
  }
}
return objectToTree(b);
};

const buildQuery = (type, a) =>
  traverseToSeekArrays([type], a)

const inspectVariables = (query) => {
  const regex = /\$\b\w*ZEUS_VAR\w*\b[!]?/g;
  let result;
  const AllVariables = [];
  while ((result = regex.exec(query))) {
    AllVariables.push(result[0]);
  }
  if (!AllVariables.length) {
    return query;
  }
  let filteredQuery = query;
  AllVariables.forEach((variable) => {
    filteredQuery = filteredQuery.replace(variable, variable.split('__ZEUS_VAR__')[0]);
  });
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`;
};

const queryConstruct = (t, tName) => (o) => `${t.toLowerCase()}${inspectVariables(buildQuery(tName, o))}`;

const fullChainConstruct = (fn) => (t,tName) => (o, variables) => fn(queryConstruct(t, tName)(o), variables);

const seekForAliases = (o) => {
  if (typeof o === 'object' && o) {
    const keys = Object.keys(o);
    if (keys.length < 1) {
      return;
    }
    keys.forEach((k) => {
      const value = o[k];
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__');
        o[alias] = {
          [operation]: value
        };
        delete o[k];
      } else {
        if (Array.isArray(value)) {
          value.forEach(seekForAliases);
        } else {
          if (typeof value === 'object') {
            seekForAliases(value);
          }
        }
      }
    });
  }
};

export const $ = (t) => `ZEUS_VAR$${t.join('')}`;


const handleFetchResponse = response => {
  if (!response.ok) {
    return new Promise((resolve, reject) => {
      response.text().then(text => {
        try { reject(JSON.parse(text)); }
        catch (err) { reject(text); }
      }).catch(reject);
    });
  }
  return response.json();
};

const apiFetch = (options) => (query, variables = {}) => {
    const fetchFunction = fetch;
    let queryString = query;
    let fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query);
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          seekForAliases(response.data)
          return response.data;
        });
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    })
      .then(handleFetchResponse)
      .then((response) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        seekForAliases(response.data)
        return response.data;
      });
  };

const ZeusSelect = () => (t) => t
  
export const Thunder = (fn) => ({
  query: ((o, variables) =>
      fullChainConstruct(fn)('query', 'Query')(o, variables).then(
        (response) => response
      ))
});

export const Chain = (...options) => ({
  query: (o, variables) =>
    fullChainConstruct(apiFetch(options))('query', 'Query')(o, variables).then(
      (response) => response
    )
});
export const Zeus = {
  query: (o) => queryConstruct('query', 'Query')(o)
};
export const Cast = {
  query: (o) => (b) => o
};
export const Selectors = {
  query: ZeusSelect()
};
    

export const Gql = Chain('https://graphql-microservice-api.azurewebsites.net/graphql')