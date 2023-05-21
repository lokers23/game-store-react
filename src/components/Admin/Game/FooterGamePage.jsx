import React from 'react';

export default function FooterGamePage({ game }) {
  return (
    <div
      className='p-3 mb-3 shadow bg-white rounded border'
      style={{ minHeight: '300px' }}
    >
      <ul className='nav nav-tabs mb-3' id='tabs1'>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active text-black-50 fw-bold'
            data-bs-toggle='tab'
            id='description-tab'
            data-bs-target='#description'
            role='tab'
            aria-controls='description'
            aria-selected='true'
          >
            Описание
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link text-black-50 fw-bold'
            data-bs-toggle='tab'
            id='system-tab'
            data-bs-target='#system'
            role='tab'
            aria-controls='system'
            aria-selected='true'
          >
            Системные требования
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link text-black-50 fw-bold'
            data-bs-toggle='tab'
            id='activation-tab'
            data-bs-target='#activation'
            role='tab'
            aria-controls='activation'
            aria-selected='true'
          >
            Активация
          </button>
        </li>
      </ul>
      <div className='tab-content'>
        <div
          className='tab-pane fade show active'
          role='tabpanel'
          id='description'
          aria-labelledby='description-tab'
        >
          {game.description}
        </div>
        <div
          className='tab-pane fade show'
          role='tabpanel'
          id='system'
          aria-labelledby='system-tab'
        >
          <div className='d-flex flex-column'>
            <ul
              className='nav nav-pills mb-3 mx-auto fw-bold'
              id='pills-tab'
              role='tablist'
            >
              {game.minimumSpecifications &&
                game.minimumSpecifications.length > 0 &&
                game.minimumSpecifications.map((minSpec, index) => (
                  <li
                    key={minSpec.id}
                    className='nav-item border rounded-3 border-primary me-3'
                    role='presentation'
                  >
                    <button
                      className={`nav-link ${index === 0 && 'active'}`}
                      data-bs-toggle='pill'
                      id={`pills-${minSpec.platform.name}-tab`}
                      data-bs-target={`#pills-${minSpec.platform.name}`}
                      role='tab'
                      aria-controls={`pills-${minSpec.platform.name}`}
                      aria-selected='true'
                    >
                      {minSpec.platform.name}
                    </button>
                  </li>
                ))}
            </ul>
            <div
              className='tab-content mx-auto p-2 w-25 border-min-spec rounded bg-min-spec'
              id='pills-tabContent'
            >
              {game.minimumSpecifications &&
                game.minimumSpecifications.length > 0 &&
                game.minimumSpecifications.map((minSpec, index) => (
                  <div
                    key={minSpec.id}
                    className={`tab-pane fade show ${index === 0 && 'active'}`}
                    role='tabpanel'
                    id={`pills-${minSpec.platform.name}`}
                    aria-labelledby={`pills-${minSpec.platform.name}-tab`}
                  >
                    <p>
                      <b>ОС:</b> {minSpec.operatingSystem}
                    </p>
                    <p>
                      <b>Процессор:</b> {minSpec.processor}
                    </p>
                    <p>
                      <b>Оперативная память:</b> {minSpec.memory}
                    </p>
                    <p>
                      <b>Графика:</b> {minSpec.graphics}
                    </p>
                    <p>
                      <b>Место на диске:</b> {minSpec.storage}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div
          className='tab-pane fade show '
          role='tabpanel'
          id='activation'
          aria-labelledby='activation-tab'
        >
          {game.activation && (
            <div className='d-flex flex-column align-items-center'>
              <p className='m-0'>После покупки вы мгновенно получите</p>
              <p className='m-0'>{game.name}</p>
              <p className='m-0'>
                лицензионный ключ активации для {game.activation.name}
              </p>
              <p className='fw-bold fs-5 mt-5'>
                Как активировать ключ {game.activation.name}?
              </p>
              <button className='btn btn-dark'>ПОДРОБНАЯ ИНСТРУКЦИЯ</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
