{% if tutorials && tutorials.length %}
    <dl {{ cssClass('tutorials', 'list-wrapper') }}>
        <dt>{{ translate('headings.tutorials', tutorials.length) }}</dt>
        {% for tutorial in tutorials %}
            <dd>{{ tutorial|tutorialLink }}</dd>
        {% endfor %}
    </dl>
{% endif %}
