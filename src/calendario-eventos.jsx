import React, { useState } from 'react';
import { Calendar, Plus, X, Video } from 'lucide-react';

export default function CalendarioEventos() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [formData, setFormData] = useState({
    banner: null,
    bannerPreview: null,
    titulo: '',
    hora: '',
    tipo: '',
    link: '',
    plataforma: '',
    ponente: '',
    descripcion: ''
  });

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Función para convertir hora a diferentes zonas horarias
  const getTimezonesFromHour = (hora) => {
    if (!hora) return null;
    const [hours, minutes] = hora.split(':');
    const baseDate = new Date();
    baseDate.setHours(parseInt(hours), parseInt(minutes), 0);

    return {
      lima: hora, // GMT-5 (asumimos que la hora ingresada es de Lima)
      colombia: hora, // GMT-5 (misma zona que Lima)
      mexico: hora // GMT-5/GMT-6 dependiendo de la región, usamos la misma por simplicidad
    };
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          banner: reader.result,
          bannerPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.hora || !formData.tipo) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const eventKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDay}`;
    const newEvent = {
      id: Date.now(),
      banner: formData.banner,
      titulo: formData.titulo,
      hora: formData.hora,
      tipo: formData.tipo,
      link: formData.link,
      plataforma: formData.plataforma,
      ponente: formData.ponente,
      descripcion: formData.descripcion,
      dia: selectedDay
    };

    setEvents(prev => ({
      ...prev,
      [eventKey]: [...(prev[eventKey] || []), newEvent]
    }));

    setFormData({
      banner: null,
      bannerPreview: null,
      titulo: '',
      hora: '',
      tipo: '',
      link: '',
      plataforma: '',
      ponente: '',
      descripcion: ''
    });
    setShowModal(false);
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const deleteEvent = (day, eventId) => {
    const eventKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setEvents(prev => ({
      ...prev,
      [eventKey]: prev[eventKey].filter(e => e.id !== eventId)
    }));
  };

  const getEventColor = (tipo) => {
    const colors = {
      'Reunión': 'from-blue-500 to-blue-600',
      'Evento': 'from-purple-500 to-purple-600',
      'Conferencia': 'from-indigo-500 to-indigo-600',
      'Taller': 'from-green-500 to-green-600',
      'Personal': 'from-pink-500 to-pink-600',
      'Otro': 'from-gray-500 to-gray-600'
    };
    return colors[tipo] || 'from-gray-500 to-gray-600';
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header compacto */}
      <div className="bg-slate-800 shadow-lg p-2 border-b border-slate-700">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-semibold text-white tracking-tight">
              {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              title="Mes anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              title="Mes siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const today = new Date().getDate();
                setSelectedDay(today);
                setShowModal(true);
              }}
              className="ml-2 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center group"
              title="Crear nuevo evento"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div className="flex-1 flex flex-col p-1 overflow-hidden">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-0 mb-0.5">
          {diasSemana.map(dia => (
            <div key={dia} className="text-center font-semibold text-indigo-300 py-1.5 text-xs tracking-wide">
              {dia}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-0 flex-1">
          {calendarDays.map((day, index) => {
            const eventKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
            const dayEvents = events[eventKey] || [];

            return (
              <div
                key={index}
                className={`relative overflow-hidden border border-slate-700 ${day ? 'bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer transition-colors' : 'bg-slate-900/30'
                  }`}
                onClick={() => day && openModal(day)}
              >
                {day && (
                  <>
                    {/* Banner de fondo si existe */}
                    {dayEvents.length > 0 && dayEvents[0].banner && (
                      <div className="absolute inset-0">
                        <img
                          src={dayEvents[0].banner}
                          alt="Banner"
                          className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="relative h-full flex flex-col p-1">
                      {/* Número del día */}
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{day}</span>
                      </div>

                      {/* Eventos */}
                      <div className="flex-1 overflow-y-auto space-y-0.5 pt-6 pr-6">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`relative bg-gradient-to-br ${getEventColor(event.tipo)} rounded-md shadow-lg hover:shadow-xl transition-all group cursor-pointer overflow-hidden border-2 border-black/30`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setShowBanner(true);
                            }}
                          >
                            {/* Overlay oscuro para mejor contraste */}
                            <div className="absolute inset-0 bg-black/20"></div>

                            {/* Borde superior colorido */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white opacity-60"></div>

                            <div className="p-1.5 relative z-10">
                              {/* Botón eliminar */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEvent(day, event.id);
                                }}
                                className="absolute top-0.5 right-0.5 bg-red-600/90 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition z-10"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>

                              {/* Contenido del evento */}
                              <div className="pr-4">
                                {/* Título del evento */}
                                <div className="font-bold text-white text-xs leading-tight mb-1 line-clamp-2 drop-shadow-lg">
                                  {event.titulo}
                                </div>

                                {/* Fila inferior: Hora + Icono (izquierda) | Tipo (derecha) */}
                                <div className="flex items-center justify-between gap-1">
                                  {/* Hora e icono de plataforma */}
                                  <div className="flex items-center gap-1">
                                    <div className="text-white font-semibold text-xs drop-shadow-md">
                                      {event.hora}
                                    </div>
                                    {event.link && event.plataforma && (
                                      <div className="bg-white/30 backdrop-blur-sm rounded-md p-0.5 shadow-sm">
                                        {event.plataforma === 'meet' && (
                                          <img
                                            src="/google-meet-icon.png"
                                            alt="Google Meet"
                                            className="w-3.5 h-3.5"
                                          />
                                        )}
                                        {event.plataforma === 'zoom' && (
                                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                            <rect width="24" height="24" rx="4" fill="#2D8CFF" />
                                            <path d="M8 7H14C14.55 7 15 7.45 15 8V12L18 9.5V14.5L15 12V16C15 16.55 14.55 17 14 17H8C7.45 17 7 16.55 7 16V8C7 7.45 7.45 7 8 7Z" fill="white" />
                                          </svg>
                                        )}
                                        {event.plataforma === 'discord' && (
                                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#5865F2">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                          </svg>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Tipo de evento */}
                                  <div className="inline-block px-1.5 py-0.5 bg-black/30 backdrop-blur-sm rounded text-white text-[10px] font-bold border border-white/20 drop-shadow-md whitespace-nowrap">
                                    {event.tipo}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Mostrar logo si no hay eventos */}
                        {dayEvents.length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <img
                              src="/datawizard.png"
                              alt="DataWizard"
                              className="w-full h-full object-contain opacity-5"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Banner */}
      {showBanner && selectedEvent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => setShowBanner(false)}>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Banner a la izquierda - 2 columnas */}
                <div className="md:col-span-2 relative h-96 md:h-auto">
                  {selectedEvent.banner ? (
                    <img
                      src={selectedEvent.banner}
                      alt={selectedEvent.titulo}
                      className="w-full h-full object-contain bg-slate-800"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getEventColor(selectedEvent.tipo)} flex items-center justify-center`}>
                      <span className="text-white text-6xl font-bold opacity-20">
                        {selectedEvent.titulo.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Información del evento a la derecha - 3 columnas */}
                <div className="md:col-span-3 p-8 flex flex-col">
                  {/* Fecha con ícono y nombre del evento */}
                  <div className="flex items-start gap-6 mb-6">
                    {/* Fecha con ícono de calendario */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded text-xs font-semibold uppercase tracking-wide">
                          {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                      </div>
                      <div className="text-6xl font-bold text-white">{selectedEvent.dia}</div>
                    </div>

                    {/* Nombre del evento */}
                    <div className="flex-1 pt-2">
                      <h2 className="text-3xl font-bold text-white leading-tight">
                        {selectedEvent.titulo}
                      </h2>
                    </div>
                  </div>

                  {/* Horarios en diferentes zonas con banderas */}
                  <div className="mb-6 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Horarios</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🇵🇪</span>
                          <div className="text-xs text-slate-400">Lima, Perú</div>
                        </div>
                        <div className="text-lg font-bold text-white">{selectedEvent.hora}</div>
                        <div className="text-xs text-slate-500">GMT-5</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🇨🇴</span>
                          <div className="text-xs text-slate-400">Colombia</div>
                        </div>
                        <div className="text-lg font-bold text-white">{selectedEvent.hora}</div>
                        <div className="text-xs text-slate-500">GMT-5</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">🇲🇽</span>
                          <div className="text-xs text-slate-400">México</div>
                        </div>
                        <div className="text-lg font-bold text-white">{selectedEvent.hora}</div>
                        <div className="text-xs text-slate-500">GMT-6</div>
                      </div>
                    </div>
                  </div>

                  {/* Ponente */}
                  {selectedEvent.ponente && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Ponente</h4>
                      <p className="text-lg text-white font-medium">{selectedEvent.ponente}</p>
                    </div>
                  )}

                  {/* Tipo de evento */}
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 bg-gradient-to-br ${getEventColor(selectedEvent.tipo)} rounded-lg text-white text-sm font-bold shadow-lg border-2 border-white/20`}>
                      {selectedEvent.tipo}
                    </span>
                  </div>

                  {/* Descripción */}
                  {selectedEvent.descripcion && (
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Descripción</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{selectedEvent.descripcion}</p>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="mt-auto space-y-3">
                    {selectedEvent.link && selectedEvent.plataforma && (
                      <a
                        href={selectedEvent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-lg transition font-bold shadow-xl text-lg"
                      >
                        {selectedEvent.plataforma === 'meet' && (
                          <img
                            src="/google-meet-icon.png"
                            alt="Google Meet"
                            className="w-6 h-6"
                          />
                        )}
                        {selectedEvent.plataforma === 'zoom' && (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#2D8CFF" />
                            <path d="M8 7H14C14.55 7 15 7.45 15 8V12L18 9.5V14.5L15 12V16C15 16.55 14.55 17 14 17H8C7.45 17 7 16.55 7 16V8C7.45 7.45 7.45 7 8 7Z" fill="white" />
                          </svg>
                        )}
                        {selectedEvent.plataforma === 'discord' && (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#5865F2">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                          </svg>
                        )}
                        Unirse al Evento
                      </a>
                    )}

                    <button
                      onClick={() => setShowBanner(false)}
                      className="w-full bg-slate-800 text-slate-300 py-3 rounded-lg hover:bg-slate-700 transition font-semibold border border-slate-700"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">
                Agregar Evento
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Selector de fecha */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Fecha del Evento *
                </label>
                <div className="flex gap-3">
                  <select
                    value={selectedDay || ''}
                    onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                    className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  >
                    <option value="">Selecciona un día</option>
                    {Array.from({ length: getDaysInMonth(currentDate).daysInMonth }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>
                        {day} de {meses[currentDate.getMonth()]}
                      </option>
                    ))}
                  </select>
                  <div className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-semibold flex items-center">
                    {currentDate.getFullYear()}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Banner (Imagen)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:text-xs file:font-medium"
                />
                {formData.bannerPreview && (
                  <img src={formData.bannerPreview} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-lg shadow-md" />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Título del Evento *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  placeholder="Ej: Reunión de equipo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Hora del Evento *
                </label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Tipo de Evento *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Reunión">Reunión</option>
                  <option value="Evento">Evento</option>
                  <option value="Conferencia">Conferencia</option>
                  <option value="Taller">Taller</option>
                  <option value="Personal">Personal</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Plataforma (Opcional)
                </label>
                <select
                  value={formData.plataforma}
                  onChange={(e) => setFormData(prev => ({ ...prev, plataforma: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                >
                  <option value="">Sin plataforma</option>
                  <option value="meet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                  <option value="discord">Discord</option>
                </select>
              </div>

              {formData.plataforma && (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    Link de la reunión
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                    placeholder="https://..."
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Ponente (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.ponente}
                  onChange={(e) => setFormData(prev => ({ ...prev, ponente: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  placeholder="Nombre del ponente"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                  Descripción (Opcional)
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm resize-none"
                  placeholder="Descripción del evento..."
                  rows="3"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm shadow-lg"
                >
                  Guardar Evento
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-600 text-white py-2.5 px-4 rounded-lg hover:bg-slate-500 transition font-semibold text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}