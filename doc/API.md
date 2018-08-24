<a name="module_get-sri"></a>

## get-sri
Generates the SRI hash of the given string to use with CDN resources without publishing the content to a CDN.

**Version**: 1.0.2  
**Author**: Richard Szakacs <richardszkcs@gmail.com> (www.richardszkcs.com)  
**License**: MIT  

* [get-sri](#module_get-sri)
    * [getSRI(string, [algorithm], [prefix])](#exp_module_get-sri--getSRI) ⇒ <code>string</code> ⏏
        * [.SHA256](#module_get-sri--getSRI.SHA256) : <code>string</code>
        * [.SHA384](#module_get-sri--getSRI.SHA384) : <code>string</code>
        * [.SHA512](#module_get-sri--getSRI.SHA512) : <code>string</code>

<a name="exp_module_get-sri--getSRI"></a>

### getSRI(string, [algorithm], [prefix]) ⇒ <code>string</code> ⏏
Generates the SRI hash of the given string.

**Kind**: Exported function  
**Returns**: <code>string</code> - The generated SRI string.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>string</td><td><code>string</code></td><td></td><td><p>The string to use to calculate the SRI hash.</p>
</td>
    </tr><tr>
    <td>[algorithm]</td><td><code>string</code></td><td><code>&quot;&#x27;sha256&#x27;&quot;</code></td><td><p>The hash algorithm to use to generate the SRI hash.</p>
</td>
    </tr><tr>
    <td>[prefix]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Whether to prefix the algorithm type to the generated hash
                                        (e.g.: &#39;sha256-...&#39;).</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const getSRI = require('get-sri')

// returns the SRI hash without prefix ('sha256' by default)
getSRI('... file content as string ...') // 'OXPgIukyI[...]6SgMU3pmfURI='

// returns the SRI hash with prefix ('sha256' by default, can be 'sha256', 'sha384', or 'sha512')
getSRI('... file content as string ...', getSRI.SHA256, true) // 'sha256-OXPgIukyI[...]6SgMU3pmfURI='
```
<a name="module_get-sri--getSRI.SHA256"></a>

#### getSRI.SHA256 : <code>string</code>
The 'sha256' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#exp_module_get-sri--getSRI)  
<a name="module_get-sri--getSRI.SHA384"></a>

#### getSRI.SHA384 : <code>string</code>
The 'sha384' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#exp_module_get-sri--getSRI)  
<a name="module_get-sri--getSRI.SHA512"></a>

#### getSRI.SHA512 : <code>string</code>
The 'sha512' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#exp_module_get-sri--getSRI)  
