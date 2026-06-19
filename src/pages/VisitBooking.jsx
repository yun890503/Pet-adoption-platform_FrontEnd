import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPaw,
  FaPlus,
} from 'react-icons/fa6';
import MemberLayout from '../components/MemberLayout.jsx';
import { odooApi } from '../services/odooApi.js';

const times = ['09:30', '10:30', '13:30', '14:30', '15:30', '16:30'];

const text = {
  title: '\u9810\u7d04\u8a2a\u8996\u7d00\u9304',
  subtitle: '\u67e5\u770b\u5df2\u9810\u7d04\u7684\u8a2a\u8996\uff0c\u4e5f\u53ef\u4ee5\u65b0\u589e\u4e00\u7b46\u8a2a\u8996\u6642\u9593\u3002',
  add: '\u65b0\u589e\u9810\u7d04',
  close: '\u95dc\u9589\u65b0\u589e\u8868\u55ae',
  formTitle: '\u586b\u5beb\u9810\u7d04\u8cc7\u8a0a',
  application: '\u5df2\u901a\u904e\u7684\u8a8d\u990a\u7533\u8acb',
  pet: '\u6bdb\u5b69',
  choosePet: '\u8acb\u9078\u64c7\u6bdb\u5b69',
  date: '\u9810\u7d04\u65e5\u671f',
  time: '\u9810\u7d04\u6642\u6bb5',
  phone: '\u806f\u7d61\u96fb\u8a71',
  note: '\u5099\u8a3b',
  submit: '\u78ba\u8a8d\u9810\u7d04',
  saved: '\u9810\u7d04\u5df2\u9001\u51fa',
  failed: '\u9810\u7d04\u5931\u6557',
  blocked: '\u5df2\u6709\u5c1a\u672a\u5230\u671f\u7684\u9810\u7d04\uff0c\u8acb\u5148\u53d6\u6d88\u539f\u9810\u7d04\u5f8c\u518d\u9810\u7d04\u5176\u4ed6\u65e5\u671f\u3002',
  cancel: '\u53d6\u6d88\u9810\u7d04',
  cancelSuccess: '\u9810\u7d04\u5df2\u53d6\u6d88',
  cancelFailed: '\u53d6\u6d88\u9810\u7d04\u5931\u6557',
  cancelled: '\u5df2\u53d6\u6d88',
  loading: '\u6b63\u5728\u8b80\u53d6 Odoo \u9810\u7d04\u7d00\u9304...',
  empty: '\u76ee\u524d\u9084\u6c92\u6709\u9810\u7d04\u7d00\u9304\u3002',
  search: '\u641c\u5c0b\u6bdb\u5b69\u540d\u7a31',
  newest: '\u6700\u65b0\u9810\u7d04',
  oldest: '\u6700\u65e9\u9810\u7d04',
  total: '\u5168\u90e8\u9810\u7d04',
  upcoming: '\u5f85\u8a2a\u8996',
  completed: '\u5df2\u5b8c\u6210',
  visitPlace: '\u8a2a\u8996\u5730\u9ede',
  placeName: '\u6696\u5fc3\u6bdb\u5b69\u4e2d\u9014\u4e4b\u5bb6',
  address: '\u53f0\u5317\u5e02\u5167\u6e56\u5340\u967d\u5149\u8857123\u865f',
  viewPet: '\u67e5\u770b\u6bdb\u5b69\u8cc7\u6599',
  detail: '\u9810\u7d04\u8cc7\u8a0a',
  dog: '\u72d7\u72d7',
  cat: '\u8c93\u54aa',
  unknown: '\u5c1a\u672a\u586b\u5beb',
};

export default function VisitBooking() {
  const toast = useToast();
  const [animals, setAnimals] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [selectedAnimalId, setSelectedAnimalId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [saving, setSaving] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    odooApi.getAnimals({ limit: 20, sort: 'newest' }).then((items) => setAnimals(Array.isArray(items) ? items : [])).catch(() => setAnimals([]));
    odooApi
      .getMyAdoptionApplications()
      .then((items) => {
        const approved = (Array.isArray(items) ? items : []).filter((item) => item.status === 'approved');
        setApplications(approved);
        if (approved[0]) {
          setSelectedApplicationId(String(approved[0].id));
          setSelectedAnimalId(String(approved[0].animal?.id || ''));
        }
      })
      .catch(() => setApplications([]));

    setLoading(true);
    odooApi
      .getMyVisitAppointments()
      .then((items) => setAppointments(Array.isArray(items) ? items : []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const selectedApplication = applications.find((item) => String(item.id) === selectedApplicationId);
  const selected = selectedApplication?.animal || animals.find((animal) => String(animal.id) === selectedAnimalId);

  const normalizedAppointments = useMemo(() => appointments.map(normalizeVisit), [appointments]);
  const filteredAppointments = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return normalizedAppointments
      .filter((item) => `${item.animalName} ${item.animalBreed}`.toLowerCase().includes(keyword))
      .sort((a, b) => (sort === 'oldest' ? a.timeValue - b.timeValue : b.timeValue - a.timeValue));
  }, [normalizedAppointments, query, sort]);

  const counts = {
    total: normalizedAppointments.length,
    upcoming: normalizedAppointments.filter((item) => item.isUpcoming).length,
    completed: normalizedAppointments.filter((item) => item.isPast && !item.isCancelled).length,
  };
  const activeFutureAppointment = normalizedAppointments.find((item) => item.isUpcoming);

  const handleApplicationChange = (value) => {
    setSelectedApplicationId(value);
    const application = applications.find((item) => String(item.id) === value);
    setSelectedAnimalId(String(application?.animal?.id || ''));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeFutureAppointment) {
      toast({ title: text.blocked, status: 'warning' });
      return;
    }
    if (!selected?.id) return;
    setSaving(true);
    try {
      const created = await odooApi.createVisitAppointment({
        animalId: selected.id,
        saleOrderId: selectedApplication?.id,
        date,
        time,
        phone,
        note,
      });
      setAppointments((current) => [created, ...current]);
      setDate('');
      setTime('');
      setPhone('');
      setNote('');
      setShowForm(false);
      toast({ title: text.saved, status: 'success' });
    } catch (error) {
      toast({ title: text.failed, description: error.message, status: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const openBookingModal = () => {
    if (activeFutureAppointment) {
      toast({ title: text.blocked, status: 'warning' });
      return;
    }
    setShowForm(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCancellingId(appointmentId);
    try {
      const updated = await odooApi.cancelVisitAppointment(appointmentId);
      setAppointments((current) => current.map((item) => (item.id === appointmentId ? updated : item)));
      toast({ title: text.cancelSuccess, status: 'success' });
    } catch (error) {
      toast({ title: text.cancelFailed, description: error.message, status: 'error' });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <MemberLayout active="/profile/appointments">
      <Flex align="center" justify="space-between" gap={3} mb={4} flexWrap="wrap">
        <Box>
          <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="900" color="warm.brown">
            {text.title}
          </Text>
          <Text mt={1} fontSize={{ base: 'xs', md: 'sm' }} color="warm.ink">
            {text.subtitle}
          </Text>
        </Box>
        <IconButton
          aria-label={text.add}
          icon={<FaPlus />}
          rounded="full"
          bg="warm.orange"
          color="white"
          boxShadow="0 8px 18px rgba(255, 138, 61, 0.28)"
          _hover={{ bg: 'warm.orangeDark', transform: 'scale(1.05)' }}
          onClick={openBookingModal}
        />
      </Flex>

      <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={{ base: 2.5, md: 3 }} mb={4}>
        <Stat icon={FaCalendarDays} value={counts.total} label={text.total} color="orange" />
        <Stat icon={FaClock} value={counts.upcoming} label={text.upcoming} color="blue" />
        <Stat icon={FaCalendarCheck} value={counts.completed} label={text.completed} color="green" />
      </SimpleGrid>

      <Box bg="white" rounded="2xl" border="1px solid" borderColor="orange.100" boxShadow="lg" overflow="hidden">
        <Flex p={{ base: 2.5, md: 4 }} gap={{ base: 2, md: 3 }} align="center" flexWrap="wrap" borderBottom="1px solid" borderColor="orange.100">
          <HStack flex={{ base: '1 1 100%', md: '0 1 320px' }} bg="white" border="1px solid" borderColor="gray.200" rounded="lg" px={{ base: 2, md: 3 }}>
            <Icon as={FaMagnifyingGlass} color="gray.400" boxSize={{ base: 3.5, md: 4 }} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} border="0" size={{ base: 'sm', md: 'md' }} fontSize={{ base: 'xs', md: 'sm' }} _focusVisible={{ boxShadow: 'none' }} />
          </HStack>
          <Select maxW={{ base: '100%', md: '180px' }} rounded="lg" size={{ base: 'sm', md: 'md' }} fontSize={{ base: 'xs', md: 'sm' }} ml={{ md: 'auto' }} value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">{text.newest}</option>
            <option value="oldest">{text.oldest}</option>
          </Select>
        </Flex>

        <VStack align="stretch" spacing={0}>
          {loading ? (
            <EmptyRow>{text.loading}</EmptyRow>
          ) : filteredAppointments.length ? (
            filteredAppointments.map((appointment) => (
              <VisitRow
                key={appointment.id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
                cancelling={cancellingId === appointment.id}
              />
            ))
          ) : (
            <EmptyRow>{text.empty}</EmptyRow>
          )}
        </VStack>
      </Box>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} isCentered size="4xl" scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
        <ModalContent mx={4} rounded="2xl" border="1px solid" borderColor="orange.100" bg="warm.cream">
          <ModalHeader color="warm.brown" fontWeight="900">
            {text.add}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <BookingForm
              applications={applications}
              animals={animals}
              selected={selected}
              selectedApplicationId={selectedApplicationId}
              selectedAnimalId={selectedAnimalId}
              date={date}
              time={time}
              phone={phone}
              note={note}
              saving={saving}
              onApplicationChange={handleApplicationChange}
              setSelectedAnimalId={setSelectedAnimalId}
              setDate={setDate}
              setTime={setTime}
              setPhone={setPhone}
              setNote={setNote}
              onSubmit={handleSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </MemberLayout>
  );
}

function BookingForm({
  applications,
  animals,
  selected,
  selectedApplicationId,
  selectedAnimalId,
  date,
  time,
  phone,
  note,
  saving,
  onApplicationChange,
  setSelectedAnimalId,
  setDate,
  setTime,
  setPhone,
  setNote,
  onSubmit,
}) {
  const petImage = selected?.images?.[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=420&q=80';

  return (
    <Box as="form" onSubmit={onSubmit} bg="white" rounded="2xl" p={{ base: 4, md: 5 }} border="1px solid" borderColor="orange.100" boxShadow="lg">
      <Text fontSize="lg" fontWeight="900" color="warm.ink" mb={4}>
        {text.formTitle}
      </Text>

      <SimpleGrid columns={{ base: 1, xl: '1fr 1.2fr' }} spacing={5}>
        <HStack align="start" spacing={4}>
          <Image src={petImage} boxSize="96px" objectFit="cover" rounded="xl" />
          <Box minW={0}>
            <Text fontSize="xl" fontWeight="900" color="warm.brown" noOfLines={1}>
              {selected?.name || text.choosePet}
            </Text>
            <HStack flexWrap="wrap" mt={2} spacing={1.5}>
              <Pill>{selected?.type === 'cat' ? text.cat : text.dog}</Pill>
              <Pill>{selected?.age || text.unknown}</Pill>
              <Pill>{selected?.breed || text.unknown}</Pill>
            </HStack>
            {selected?.id && (
              <Button as={Link} to={`/animals/${selected.id}`} mt={3} size="sm" variant="outline" colorScheme="orange">
                {text.viewPet}
              </Button>
            )}
          </Box>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
          {applications.length ? (
            <FormControl isRequired>
              <FormLabel fontSize="sm">{text.application}</FormLabel>
              <Select size="sm" rounded="lg" value={selectedApplicationId} onChange={(event) => onApplicationChange(event.target.value)}>
                {applications.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.number || item.name} - {item.animal?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel fontSize="sm">{text.pet}</FormLabel>
              <Select size="sm" rounded="lg" value={selectedAnimalId} onChange={(event) => setSelectedAnimalId(event.target.value)} required>
                <option value="">{text.choosePet}</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          <Field label={text.date} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          <FormControl>
            <FormLabel fontSize="sm">{text.time}</FormLabel>
            <Select size="sm" rounded="lg" value={time} onChange={(event) => setTime(event.target.value)} required>
              <option value="">{text.time}</option>
              {times.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <Field label={text.phone} value={phone} onChange={(event) => setPhone(event.target.value)} required />
          <FormControl gridColumn={{ md: '1 / -1' }}>
            <FormLabel fontSize="sm">{text.note}</FormLabel>
            <Textarea size="sm" rounded="lg" value={note} onChange={(event) => setNote(event.target.value)} />
          </FormControl>
          <Button type="submit" isLoading={saving} bg="warm.orange" color="white" size="sm" gridColumn={{ md: '1 / -1' }}>
            {text.submit}
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}

function VisitRow({ appointment, onCancel, cancelling }) {
  const [selectedVisit, setSelectedVisit] = useState(null);
  const isOpen = Boolean(selectedVisit);

  return (
    <Box borderBottom="1px solid" borderColor="orange.100" _last={{ borderBottom: 0 }}>
      <Flex
        role="button"
        tabIndex={0}
        p={{ base: 3, md: 5 }}
        gap={{ base: 3, md: 4 }}
        align={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        cursor="pointer"
        transition="background 0.18s ease"
        _hover={{ bg: 'orange.50' }}
        onClick={() => setSelectedVisit(appointment)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setSelectedVisit(appointment);
        }}
      >
        <HStack spacing={{ base: 2.5, md: 4 }} flex="1" align="start" minW={0}>
          <Image src={appointment.image} boxSize={{ base: '58px', md: '92px' }} objectFit="cover" rounded="xl" flexShrink={0} />
          <Box minW={0}>
            <HStack spacing={2}>
              <Text fontSize={{ base: 'md', md: 'xl' }} fontWeight="900" color="warm.brown" noOfLines={1}>
                {appointment.animalName}
              </Text>
              <Badge rounded="full" colorScheme={appointment.isCancelled ? 'gray' : appointment.isPast ? 'green' : 'orange'} fontSize={{ base: '10px', md: 'xs' }}>
                {appointment.isCancelled ? text.cancelled : appointment.isPast ? text.completed : text.upcoming}
              </Badge>
            </HStack>
            <HStack flexWrap="wrap" mt={1} spacing={1.5}>
              <Pill>{appointment.animalType === 'cat' ? text.cat : text.dog}</Pill>
              <Pill>{appointment.animalBreed}</Pill>
            </HStack>
            {/* <Text mt={2} color="gray.700" fontSize="sm" noOfLines={1}>
            {appointment.note || text.detail}
          </Text> */}
          </Box>
        </HStack>

        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 1.5, md: 2 }} flex="1" fontSize={{ base: 'xs', md: 'sm' }}>
          <Detail icon={FaCalendarDays} label={text.date} value={appointment.dateText} />
          <Detail icon={FaClock} label={text.time} value={appointment.timeText} />
          <Detail icon={FaLocationDot} label={text.visitPlace} value={text.placeName} />
          <Detail icon={FaPaw} label={text.phone} value={appointment.phone || '-'} />
        </SimpleGrid>
      </Flex>

      <VisitDetailModal
        appointment={selectedVisit}
        isOpen={isOpen}
        onClose={() => setSelectedVisit(null)}
        onCancel={async (id) => {
          await onCancel(id);
          setSelectedVisit(null);
        }}
        cancelling={cancelling}
      />
    </Box>
  );
}

function VisitDetailModal({ appointment, isOpen, onClose, onCancel, cancelling }) {
  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
      <ModalContent mx={4} rounded="2xl" border="1px solid" borderColor="orange.100">
        <ModalHeader color="warm.brown" fontWeight="900">
          {text.detail}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack spacing={4} align="start" mb={4}>
            <Image src={appointment.image} boxSize="92px" objectFit="cover" rounded="xl" />
            <Box minW={0}>
              <Text fontSize="xl" fontWeight="900" color="warm.brown" noOfLines={1}>
                {appointment.animalName}
              </Text>
              <HStack mt={2} flexWrap="wrap" spacing={1.5}>
                <Pill>{appointment.animalType === 'cat' ? text.cat : text.dog}</Pill>
                <Pill>{appointment.animalBreed}</Pill>
              </HStack>
            </Box>
          </HStack>

          <Box bg="warm.cream" border="1px solid" borderColor="orange.100" rounded="xl" p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} fontSize="sm">
              <Detail icon={FaPaw} label={text.pet} value={appointment.animalName} />
              <Detail icon={FaCalendarDays} label={text.date} value={appointment.dateText} />
              <Detail icon={FaClock} label={text.time} value={appointment.timeText} />
              <Detail icon={FaLocationDot} label={text.visitPlace} value={text.placeName} />
              <Detail icon={FaPaw} label={text.phone} value={appointment.phone || '-'} />
            </SimpleGrid>
            <Text mt={3} color="gray.700" fontSize="sm">
              {appointment.note || text.address}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="outline" onClick={onClose}>
            關閉
          </Button>
          {appointment.isUpcoming && (
            <Button colorScheme="red" variant="outline" isLoading={cancelling} onClick={() => onCancel(appointment.id)}>
              {text.cancel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Stat({ icon, value, label, color }) {
  return (
    <HStack bg="rgba(255,255,255,0.94)" rounded="xl" p={{ base: 2, md: 4 }} border="1px solid" borderColor="orange.100" boxShadow="md" spacing={{ base: 2, md: 3 }} minW={0}>
      <Flex boxSize={{ base: '28px', md: '40px' }} rounded="xl" align="center" justify="center" bg={`${color}.50`} color={`${color}.500`} flexShrink={0}>
        <Icon as={icon} boxSize={{ base: 3.5, md: 5 }} />
      </Flex>
      <Box minW={0}>
        <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="900" color="warm.brown" lineHeight="1" noOfLines={1}>
          {value}
        </Text>
        <Text fontSize={{ base: '10px', md: 'sm' }} fontWeight="800" color="warm.ink" noOfLines={2}>
          {label}
        </Text>
      </Box>
    </HStack>
  );
}

function Detail({ icon, label, value }) {
  return (
    <HStack color="warm.ink" spacing={2} minW={0}>
      <Icon as={icon} color="warm.brown" boxSize={3.5} flexShrink={0} />
      <Text color="gray.600" whiteSpace="nowrap" flexShrink={0}>
        {label}
      </Text>
      <Text fontWeight="800" noOfLines={1}>
        {value || '-'}
      </Text>
    </HStack>
  );
}

function Field({ label, ...props }) {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Input size="sm" rounded="lg" {...props} />
    </FormControl>
  );
}

function Pill({ children }) {
  return (
    <Badge rounded="full" px={{ base: 2, md: 2.5 }} py={0.5} bg="orange.50" color="warm.brown" fontSize={{ base: '10px', md: 'xs' }} textTransform="none">
      {children || text.unknown}
    </Badge>
  );
}

function EmptyRow({ children }) {
  return (
    <Box p={6}>
      <Text fontWeight="900" color="warm.brown" fontSize="sm">
        {children}
      </Text>
    </Box>
  );
}

function normalizeVisit(appointment) {
  const animal = appointment.animal || {};
  const rawStart = appointment.start || appointment.date || '';
  const date = rawStart ? new Date(rawStart) : null;
  const timeValue = date?.getTime?.() || 0;
  const dateText = Number.isFinite(timeValue) && timeValue ? date.toLocaleDateString('zh-TW') : rawStart || '-';
  const timeText = Number.isFinite(timeValue) && timeValue ? date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }) : appointment.time || '-';

  return {
    id: appointment.id,
    animalId: animal.id || appointment.animalId,
    animalName: animal.name || text.unknown,
    animalType: animal.type || 'dog',
    animalBreed: animal.breed || text.unknown,
    image: animal.images?.[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=420&q=80',
    dateText,
    timeText,
    timeValue,
    isCancelled: appointment.isCancelled || appointment.state === 'cancelled',
    isPast: timeValue ? timeValue < Date.now() : false,
    isUpcoming: timeValue ? timeValue >= Date.now() && !(appointment.isCancelled || appointment.state === 'cancelled') : false,
    phone: appointment.phone,
    note: appointment.note || appointment.message,
  };
}
