{% import '../../macros.swig' as macros %}

{# TODO: may need to incorporate changes from https://github.com/jsdoc3/jsdoc/commit/74ad8efe #}
{%- spaceless %}
    {% if exceptions && exceptions.length %}
        <dt>{{ translate('headings.throws') }}</dt>
        {% for exception in exceptions %}
            <dd>
                {% if exception.type && exception.type.names %}
                    {{ macros.typeList(exception.type.names, 'exception') }}
                {% endif %}
                {% include '../description.swig' with exception only %}
            </dd>
        {% endfor %}
    {% endif %}
{% endspaceless -%}
