<a name="getSRI"></a>

## getSRI(string, [algorithm], [prefix]) ⇒ <code>string</code>
Generates the SRI hash of the given string.

**Kind**: global function  
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


* [getSRI(string, [algorithm], [prefix])](#getSRI) ⇒ <code>string</code>
    * [.SHA256](#getSRI.SHA256) : <code>string</code>
    * [.SHA384](#getSRI.SHA384) : <code>string</code>
    * [.SHA512](#getSRI.SHA512) : <code>string</code>

<a name="getSRI.SHA256"></a>

### getSRI.SHA256 : <code>string</code>
The 'sha256' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#getSRI)  
<a name="getSRI.SHA384"></a>

### getSRI.SHA384 : <code>string</code>
The 'sha384' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#getSRI)  
<a name="getSRI.SHA512"></a>

### getSRI.SHA512 : <code>string</code>
The 'sha512' hash algorithm constant.

**Kind**: static constant of [<code>getSRI</code>](#getSRI)  
